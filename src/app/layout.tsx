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
        className={`mx-auto min-h-screen max-w-7xl bg-[url('https://static.vecteezy.com/system/resources/previews/046/892/800/non_2x/comic-panels-in-various-colors-and-angles-comic-images-image-panels-cartoon-backgrounds-suitable-for-headlines-or-places-for-anime-images-vector.jpg')] bg-repeat-round text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
