import type { TabId } from "@/lib/content"

// Comentarios que Meowl dice al entrar en cada sección. Van rotando en orden
// en cada visita (1 → 2 → 3 → 1…).
export const SECTION_COMMENTS: Record<TabId, string[]> = {
  presentacion: [
    "Ese de la foto es Kevin: backend, nube y un gato-búho de testigo. Tócame si quieres preguntarme algo.",
    "Mitad gato, mitad búho, y aun así sé más de Spring Boot que de cazar ratones.",
    "Kevin construye sistemas; yo vigilo la noche. Un equipo equilibrado, la verdad.",
  ],
  experiencia: [
    "De la pasantía en Favorcito a tres sistemas institucionales en producción: esa es la experiencia laboral de Kevin.",
    "Pasantía, colegio de administradores y dos sistemas de la UCB. Todo eso ya está corriendo, no en un cajón.",
    "Cada nodo de esta línea es trabajo real entregado. Yo solo pongo la rama.",
  ],
  habilidades: [
    "Java, Spring Boot, React e IA. Kevin tiene más capas que yo, pero yo soy más suave.",
    "Backend primero, nube después y una capa de IA encima. Como una cebolla, pero sin llorar.",
    "Si es un test psicométrico o un panel de socios, Kevin lo resuelve con el mismo stack.",
  ],
  proyectos: [
    "Clientes a un lado, experimentos al otro. Abre cualquiera y te cuento el detalle.",
    "Tres sistemas en producción y contando. Yo reviso que ninguno se escape del servidor.",
    "Hay más capturas que historias de terror: entra a «Ver detalles» y juzgá vos.",
  ],
  blog: [
    "La biblioteca está vacía por ahora. Yo cuido el estante mientras Kevin escribe.",
    "Artículos en camino: backend, nube e IA. Yo ya aparté mi rama para leerlos.",
    "Cero posts, cero drama. Cuando Kevin publique, te aviso con un maullido.",
  ],
}
