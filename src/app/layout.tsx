import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthContext from "./api/context/AuthContext";
import NotificationProvider from "./utils/NotificationsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabharwal Finance",
  description: "Manage your finances efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        
      ><NotificationProvider>
        <AuthContext>
        {children}
        </AuthContext>
        </NotificationProvider>
      </body>
    </html>
  );
}
