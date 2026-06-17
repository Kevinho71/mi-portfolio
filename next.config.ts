import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mi-portfolio",       // ← nombre exacto de tu repo en GitHub
  images: {
    unoptimized: true,             // necesario para export estático
  },
};

export default nextConfig;
