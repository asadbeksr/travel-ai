import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Travel Assistant by Asadbek Savronov",
  description: "Travel Assistant week-3 Headstarter Ai Fellowship projectby Asadbek Savronov - Travel Assistant built with Vercel AI + Hugging Face AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00FF00_100%)]"></div>
        {children}</body>
    </html>
  );
}
