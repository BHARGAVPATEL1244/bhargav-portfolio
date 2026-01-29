import { create } from 'zustand';

export type AppId = 'finder' | 'terminal' | 'browser' | 'settings' | 'trash';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type WallpaperType = 'grid' | 'gradient' | 'nexus';
export type WindowStyle = 'glass' | 'retro' | 'solid';

interface OSTheme {
  wallpaper: WallpaperType;
  windowStyle: WindowStyle;
}

interface OSState {
  isBooted: boolean;
  activeWindowId: AppId | null;
  windows: Record<AppId, WindowState>;
  theme: OSTheme;

  bootOS: () => void;
  shutdownOS: () => void;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  setTheme: (theme: Partial<OSTheme>) => void;
}

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  finder: {
    id: 'finder',
    title: 'Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 50, y: 50 },
    size: { width: 600, height: 400 },
    zIndex: 1,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal - zsh',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 600, y: 80 },
    size: { width: 700, height: 500 },
    zIndex: 2,
  },
  browser: {
    id: 'browser',
    title: 'Antigravity Code Browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 150 },
    size: { width: 900, height: 600 },
    zIndex: 1,
  },
  settings: {
    id: 'settings',
    title: 'System Preferences',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 400, y: 300 },
    size: { width: 450, height: 350 },
    zIndex: 1,
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 400 },
    size: { width: 300, height: 200 },
    zIndex: 1,
  },
};

export const useOSStore = create<OSState>((set, get) => ({
  isBooted: false,
  activeWindowId: 'terminal',
  windows: INITIAL_WINDOWS,
  theme: {
    wallpaper: 'grid',
    windowStyle: 'glass',
  },

  bootOS: () => set({ isBooted: true }),
  shutdownOS: () => set({ isBooted: false }),
  setTheme: (partial) => set((state) => ({ theme: { ...state.theme, ...partial } })),

  openWindow: (id) =>
    set((state) => {
      const maxZ = Math.max(...Object.values(state.windows).map((w) => w.zIndex));
      return {
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: maxZ + 1,
          },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      const maxZ = Math.max(...Object.values(state.windows).map((w) => w.zIndex));
      return {
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: maxZ + 1, isMinimized: false },
        },
      };
    }),
}));
