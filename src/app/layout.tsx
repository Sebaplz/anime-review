import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Review",
  description: "App to review anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <SessionProvider>
        <body className={`mx-auto min-h-screen max-w-7xl ${inter.className}`}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
