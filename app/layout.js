import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}