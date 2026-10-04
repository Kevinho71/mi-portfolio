import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mi-portfolio",       // ← nombre exacto de tu repo en GitHub
  images: {
    unoptimized: true,             // necesario para export estático
  },
  // Evita que Turbopack infiera mal la raíz al haber otro package-lock.json fuera del proyecto.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
