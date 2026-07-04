import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VLYNE - Controle operacional, estoque, eventos e etiquetas",
  description:
    "A VLYNE ajuda empresas a identificar perdas, controlar estoque, acompanhar projetos, reduzir rupturas e gerenciar etiquetas, validade e rastreabilidade.",
  keywords:
    "VLYNE, controle de estoque, ruptura de estoque, produtos sem giro, gestao de eventos, etiquetas, food safety, validade, rastreabilidade, inteligencia operacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
