import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers.ts/authProvider"
import { getServerSession } from "next-auth";
import StoreProvider from "@/lib/store/store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vital-Aid",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  
  return (
    <html lang="en">

      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
         <StoreProvider>
        {children}
        </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
