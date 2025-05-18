import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "selflearn.AI - AI Learning Platfrom",
  description: "Learn skills through fun and lessons",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
