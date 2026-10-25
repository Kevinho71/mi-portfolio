import type { Metadata } from "next";
import { Silkscreen, VT323 } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// GoatCounter: reemplazá "TU-CODIGO" por tu código (el subdominio de tu panel).
// Ej: si tu panel es https://kevinho71.goatcounter.com, poné "kevinho71".
const GOATCOUNTER_CODE: string = "kevinho71";

// Aplica el tema guardado antes del primer paint para evitar el destello (FOUC).
const THEME_INIT = `try{if(localStorage.getItem("theme")==="w98"){document.documentElement.dataset.theme="w98"}}catch(e){}`;

// Tipografía pixel-art: Silkscreen (grilla de 8 px) para títulos, VT323 para el resto.
const pixelDisplay = Silkscreen({
  variable: "--font-pixel-display",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const pixelTerm = VT323({
  variable: "--font-pixel-term",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Guzman — Desarrollador Full Stack",
  description:
    "Portfolio de Kevin Ady Guzman Marca, desarrollador Full Stack egresado de Ingeniería de Sistemas (UCB), especializado en Java Spring Boot, React TypeScript y AWS, con experiencia en sistemas en producción e ingeniería de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${pixelDisplay.variable} ${pixelTerm.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <MotionProvider>{children}</MotionProvider>
        {GOATCOUNTER_CODE !== "TU-CODIGO" && (
          <Script
            data-goatcounter={`https://${GOATCOUNTER_CODE}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
