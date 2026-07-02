import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DynamicCursorTrail from "@/components/DynamicCursorTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E. — Modern E-Learning Platform",
  description:
    "A stunning, modern e-learning platform built with Next.js, Three.js, and Tailwind CSS. Interactive 3D visuals, premium design, and seamless user experience.",
};

export const viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <DynamicCursorTrail />
        {children}
      </body>
    </html>
  );
}