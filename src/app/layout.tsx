import type { Metadata, Viewport } from "next";
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
  title: "VLYNE Event Intelligence - Gestão de eventos e stands do prospect ao pagamento",
  description:
    "VLYNE Event Intelligence: gestão de eventos, stands e projetos do prospect ao pagamento — margem real por projeto, contratos, equipes e logística num só lugar.",
  keywords:
    "VLYNE, gestao de eventos, stands, montadora de estandes, margem por projeto, contrato de evento, cronograma de producao, orcamento por metragem, logistica de eventos, CRM de eventos",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/vlyne-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/vlyne-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "VLYNE",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#01143F",
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
