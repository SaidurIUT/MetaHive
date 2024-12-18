// src/app/layout.js

"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../config/authContext";
import { initializeTheme } from "../config/colorUtils";
import ClientThemeProvider from "../providers/clientThemeProvider";
import Navbar from "../components/basicComponents/navbar";
import Footer from "../components/basicComponents/footer";
import { useEffect } from "react";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MetaHive - Collaborative Platform for Software Engineers",
  description:
    "MetaHive is a metaverse-inspired collaborative platform for remote workers.",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ClientThemeProvider>
          <Toaster />
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
