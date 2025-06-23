import { Nav } from "@/src/components/Nav/Nav";
import { Toaster } from "@/src/components/ui/toaster";
import { TanstackProvider } from "@/src/lib/query-client";
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
        <TanstackProvider>
          <div className="min-h-screen flex flex-col  m-auto">
            <Nav />
            {children}
          </div>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}
