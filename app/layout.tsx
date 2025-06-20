import { Nav } from "@/src/components/Nav/Nav";
import { Toaster } from "@/src/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Map",
  description: "Map quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen flex flex-col  m-auto">
          <Nav />
          {children}
        </div>

        <Toaster />
      </body>
    </html>
  );
}
