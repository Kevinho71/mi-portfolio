"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "kevin4000100@gmail.com",
    href: "mailto:kevin4000100@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+591 60259580",
    href: "https://wa.me/59160259580",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/Kevinho71",
    href: "https://github.com/Kevinho71",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "kevin-guzmán-marca",
    href: "https://www.linkedin.com/in/kevin-guzmán-marca-730b88301",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t-2 border-border/40 bg-muted/20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
            &gt; SECTION_04 / CONTACTO
          </p>
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Hablemos</h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
            // Estoy abierto a oportunidades laborales, proyectos freelance o simplemente charlar sobre tecnología.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Card>
                <CardContent className="p-5 pt-5 flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-border bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/15 transition-colors">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      &gt; {label}
                    </p>
                    <p className="text-sm font-mono text-foreground truncate">{value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <a href="mailto:kevin4000100@gmail.com">
              <Mail size={16} className="mr-2" /> ./enviar_mensaje
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
