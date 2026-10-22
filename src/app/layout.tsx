import type { Metadata } from "next";
import { JetBrains_Mono, Special_Elite } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// GoatCounter: reemplazá "TU-CODIGO" por tu código (el subdominio de tu panel).
// Ej: si tu panel es https://kevinho71.goatcounter.com, poné "kevinho71".
const GOATCOUNTER_CODE: string = "kevinho71";

// Aplica el tema guardado antes del primer paint para evitar el destello (FOUC).
const THEME_INIT = `try{if(localStorage.getItem("theme")==="w98"){document.documentElement.dataset.theme="w98"}}catch(e){}`;

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
      className={`${jetbrainsMono.variable} ${specialElite.variable} h-full antialiased`}
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
