import type { Metadata } from "next";
import { JetBrains_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Guzman — Desarrollador Full Stack",
  description:
    "Portfolio de Kevin Ady Guzman Marca, estudiante de Ingeniería de Sistemas enfocado en desarrollo backend y arquitectura en la nube escalable, especializado en Java Spring Boot, React TypeScript y AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jetbrainsMono.variable} ${specialElite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
