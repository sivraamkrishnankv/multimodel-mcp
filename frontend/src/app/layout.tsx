import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multimodel MCP Dashboard",
  description: "Web UI for weather and file-system MCP servers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <div className="min-h-screen">
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-sky-500/80" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">
                    Multimodel MCP
                  </span>
                  <span className="text-xs text-slate-400">
                    Weather & File System Assistant
                  </span>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <NavLink href="/chat" label="Chat" />
                <NavLink href="/weather" label="Weather" />
                <NavLink href="/files" label="Files" />
              </div>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 hover:text-sky-300"
    >
      {label}
    </Link>
  );
}
