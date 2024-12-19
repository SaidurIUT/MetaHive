import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../config/authContext";
import ClientThemeProvider from "../providers/clientThemeProvider";
import Navbar from "../components/basicComponents/navbar";
import Footer from "../components/basicComponents/footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MetaHive - Collaborative Platform for Software Engineers",
  description:
    "MetaHive is a metaverse-inspired collaborative platform for remote workers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
