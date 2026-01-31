import { create } from 'zustand';

export type AppId = 'finder' | 'terminal' | 'browser' | 'settings' | 'trash' | 'mirror' | 'weather' | 'notes';

// ... (keep interface definitions)



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
  resizeWindow: (id: AppId, size: { width: number; height: number }) => void;
  moveWindow: (id: AppId, position: { x: number; y: number }) => void;
}

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  finder: {
    id: 'finder',
    title: 'Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 500 },
    zIndex: 1,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 150 },
    size: { width: 600, height: 400 },
    zIndex: 2,
  },
  browser: {
    id: 'browser',
    title: 'Browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 100 },
    size: { width: 900, height: 600 },
    zIndex: 3,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 200 },
    size: { width: 400, height: 500 },
    zIndex: 4,
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 400, y: 300 },
    size: { width: 400, height: 300 },
    zIndex: 5,
  },
  mirror: {
    id: 'mirror',
    title: 'Mirror',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 450, y: 150 },
    size: { width: 400, height: 500 },
    zIndex: 6,
  },
  weather: {
    id: 'weather',
    title: 'Atmosphere',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
    size: { width: 350, height: 400 },
    zIndex: 7,
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 150 },
    size: { width: 700, height: 500 },
    zIndex: 8,
  }
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
  resizeWindow: (id: AppId, size: { width: number; height: number }) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size },
      },
    })),

  moveWindow: (id: AppId, position: { x: number; y: number }) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    })),
}));
