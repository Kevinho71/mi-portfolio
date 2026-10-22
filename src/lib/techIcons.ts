const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

export const TECH_ICONS: Record<string, string> = {
  Java: `${DEVICON}/java/java-original.svg`,
  "Spring Boot": `${DEVICON}/spring/spring-original.svg`,
  "Spring AI": `${DEVICON}/spring/spring-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  Flyway: "/mi-portfolio/Flyway_logo.svg",
  MinIO: `${DEVICON}/minio/minio-original.svg`,
  React: `${DEVICON}/react/react-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  "Tailwind CSS": `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
}

export function getTechIcon(label: string): string | undefined {
  return TECH_ICONS[label]
}
