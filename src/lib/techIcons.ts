const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

export const TECH_ICONS: Record<string, string> = {
  Java: `${DEVICON}/java/java-original.svg`,
  "Spring Boot": `${DEVICON}/spring/spring-original.svg`,
  "Spring AI": `${DEVICON}/spring/spring-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  Flyway: "/Flyway_logo.svg",
  MinIO: `${DEVICON}/minio/minio-original.svg`,
  React: `${DEVICON}/react/react-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  JavaScript: `${DEVICON}/javascript/javascript-original.svg`,
  "Node.js": `${DEVICON}/nodejs/nodejs-original.svg`,
  Python: `${DEVICON}/python/python-original.svg`,
  FastAPI: `${DEVICON}/fastapi/fastapi-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  MongoDB: `${DEVICON}/mongodb/mongodb-original.svg`,
  Git: `${DEVICON}/git/git-original.svg`,
  Firebase: `${DEVICON}/firebase/firebase-original.svg`,
  Linux: `${DEVICON}/linux/linux-original.svg`,
  AWS: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  GCP: `${DEVICON}/googlecloud/googlecloud-original.svg`,
  "Tailwind CSS": `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
}

export function getTechIcon(label: string): string | undefined {
  return TECH_ICONS[label]
}
