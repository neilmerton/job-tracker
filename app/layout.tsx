import type { Metadata } from "next";
import { Inter } from '@next/font/google';
import "./globals.css";

const inter = Inter({
  preload: true,
  subsets: ['latin'],
  variable: '--inter-font',
});

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Local job and networking tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Job Tracker" />
      </head>
      <body>{children}</body>
    </html>
  );
}
