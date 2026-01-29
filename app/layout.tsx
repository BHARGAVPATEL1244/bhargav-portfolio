import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KeyboardManager from "@/components/ui/KeyboardManager";
import { SessionProvider } from "@/components/context/SessionContext";
import ThemeBuilder from "@/components/ui/ThemeBuilder";
import PitchBot from "@/components/ui/PitchBot";
import OSDesktop from "@/components/os/Desktop";
import OSBootButton from "@/components/os/OSBootButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhargav Patel | Digital Portfolio",
  description: "A Next-Gen Digital Portfolio experience.",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <KeyboardManager />
          <ThemeBuilder />
          <PitchBot />
          <OSDesktop />
          <OSBootButton />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
