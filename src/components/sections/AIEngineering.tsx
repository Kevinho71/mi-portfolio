"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const capabilities = [
  {
    id: "01",
    title: "AI Harness Development",
    description:
      "Construyo el andamiaje que hace confiable a un modelo: contexto, herramientas, permisos, límites y puntos de control. El modelo no es el sistema; el harness sí.",
    tags: ["contexto", "tooling", "guardrails"],
  },
  {
    id: "02",
    title: "MCP · Model Context Protocol",
    description:
      "Conecto agentes a datos y herramientas reales mediante un protocolo estándar: una integración, muchos clientes. Menos scripts frágiles, más interoperabilidad.",
    tags: ["servidores", "resources", "tools"],
  },
  {
    id: "03",
    title: "Agent Skills",
    description:
      "Empaqueto procedimientos y conocimiento en skills reutilizables para que el agente ejecute cada tarea con el mismo criterio, sin repetir instrucciones ni depender de la memoria del chat.",
    tags: ["procedimientos", "reuso", "consistencia"],
  },
  {
    id: "04",
    title: "SDD · Spec-Driven Development",
    description:
      "Primero la especificación, después el código. El agente implementa contra un contrato verificable, y la revisión deja de ser una opinión para volverse objetiva.",
    tags: ["specs", "contratos", "revisión"],
  },
  {
    id: "05",
    title: "Agentic Workflows",
    description:
      "Diseño flujos donde el agente decide y actúa, con supervisión humana exactamente donde el error cuesta caro. Automatización con criterio, no con fe.",
    tags: ["orquestación", "human-in-the-loop"],
  },
  {
    id: "06",
    title: "Evals",
    description:
      "Mido si el sistema de IA realmente funciona: casos de prueba, criterios de aceptación y regresiones. Sin evals, una demo no es un producto.",
    tags: ["métricas", "regresión", "calidad"],
  },
]

export default function AIEngineering() {
  return (
    <section id="ai" className="py-24 border-t-2 border-border/40 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
            &gt; SECTION_04 / AI_ENGINEERING
          </p>
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
            IA como ingeniería, no como demo
          </h2>
          <p className="mt-3 font-mono text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {"// Un modelo impresionante no sirve si no es repetible, medible y seguro. Trabajo el resto de la cadena: lo que hace que un agente se pueda usar en producción y no solo en una presentación."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="h-full group hover:border-accent transition-colors">
                <CardHeader className="pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                    {"// "}
                    {item.id}
                  </span>
                  <CardTitle className="text-base text-foreground group-hover:text-accent transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono uppercase tracking-wider text-accent/90 border border-accent/40 bg-accent/5 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 font-mono text-xs text-muted-foreground/80 leading-relaxed"
        >
          {"// Aplicado en producción: capa de IA en el Gabinete Psicológico de la UCB para informes clínicos y de orientación vocacional, con revisión profesional y control de errores."}
        </motion.p>
      </div>
    </section>
  )
}
