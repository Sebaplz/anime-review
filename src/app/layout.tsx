import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={`mx-auto min-h-screen max-w-7xl bg-black text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
