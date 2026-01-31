import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KeyboardManager from "@/components/ui/KeyboardManager";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/context/SessionContext";
// import ThemeBuilder from "@/components/ui/ThemeBuilder";
import PitchBot from "@/components/ui/PitchBot";
import OSDesktop from "@/components/os/Desktop";
import OSBootButton from "@/components/os/OSBootButton";
import { CommandMenu } from "@/components/ui/CommandMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bhargavpatel.dev'),
  title: {
    default: "Bhargav Patel | Creative Developer",
    template: "%s | Bhargav Patel"
  },
  description: "A Next-Gen Digital Portfolio experience showcasing creative development, interactive design, and OS-level web applications.",
  keywords: ["Creative Developer", "React", "Next.js", "Portfolio", "Frontend Engineer", "Interactive Design"],
  authors: [{ name: "Bhargav Patel" }],
  creator: "Bhargav Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhargavpatel.dev",
    siteName: "Bhargav Patel Portfolio",
    title: "Bhargav Patel | Creative Developer",
    description: "Experience the future of web portfolios. Interactive OS, 3D elements, and creative development showcases.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bhargav Patel Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhargav Patel | Creative Developer",
    description: "A Next-Gen Digital Portfolio experience.",
    creator: "@bhargav1244",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bhargav OS",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div id="skip-nav" className="scale-0 h-0 w-0 overflow-hidden">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:p-4 focus:bg-white focus:text-black focus:rounded-lg">
            Skip to main content
          </a>
        </div>
        <SessionProvider>
          <ThemeProvider attribute="data-theme" defaultTheme="deep-space" enableSystem={false}>
            <KeyboardManager />
            {/* <ThemeBuilder /> */}
            <PitchBot />
            <CommandMenu />
            <main id="main-content" className="relative">
              <OSDesktop />
              <OSBootButton />
              {children}
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
