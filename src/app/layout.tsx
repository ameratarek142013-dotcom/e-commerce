import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import FeaturesBar from "@/app/_components/FeaturesBar/FeaturesBar";
import { ToastContainer } from 'react-toastify';
import MySessionProvider from "@/MySessionProvider/MySessionProvider";

const exo = Exo({
  variable: "--font-Exo",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Modern E-commerce website built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${exo.variable}  h-full antialiased`}
    >
      <body className={`${exo.variable} min-h-full flex flex-col`} suppressHydrationWarning>
        <MySessionProvider>
          <Navbar />
          <ToastContainer />

          {children}
          <FeaturesBar />
          <Footer />

        </MySessionProvider>


      </body>
    </html>
  );
}
