import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import "./globals.css";

const font = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Suraksha – AI Agent Security Checker",
  description: "Test your AI agent's system prompt for common security vulnerabilities and get a simple report.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className="font-sans">
        <header className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-4xl items-center px-5 py-4">
            <Link href="/" aria-label="Suraksha home"><Logo /></Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">{children}</main>
      </body>
    </html>
  );
}
