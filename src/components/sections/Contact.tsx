"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MessageCircle } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "kevin4000100@gmail.com",
    href: "mailto:kevin4000100@gmail.com",
    color: "from-orange-400 to-pink-500",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+591 60259580",
    href: "https://wa.me/59160259580",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/Kevinho71",
    href: "https://github.com/Kevinho71",
    color: "from-slate-700 to-slate-900",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "kevin-guzmán-marca",
    href: "https://www.linkedin.com/in/kevin-guzmán-marca-730b88301",
    color: "from-sky-500 to-blue-600",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-5xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <MessageCircle size={12} /> Contacto
          </div>
          <h2 className="text-4xl sm:text-5xl font-display tracking-tight mb-3">
            ¿Trabajamos <span className="gradient-text">juntos?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estoy abierto a oportunidades laborales, proyectos freelance o simplemente
            charlar sobre tecnología. ¡Escríbeme!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {contactLinks.map(({ icon: Icon, label, value, href, color }, i) => (
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
              <Card className="soft-shadow border-border/60 rounded-2xl overflow-hidden">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="gradient-brand text-white border-0 rounded-full px-8 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
            <a href="mailto:kevin4000100@gmail.com">
              <Mail size={16} className="mr-2" /> Enviar mensaje
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
