import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eva",
  description: "Aplataforma de ayuda digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 text-gray-100`}>
        <Header />
        {children}

        <div className="md:top-0 bottom-0 md:bottom-auto md:flex md:justify-center md:items-center bg-slate-900 md:bg-transparent px-4 md:px-0 py-2 md:py-0 w-full md:w-auto md:h-screen text-center md:text-left">
          <Footer />
        </div>
      </body>
    </html>
  );
}
