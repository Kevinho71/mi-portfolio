import { Badge } from "@/components/ui/badge"
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
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3 text-xs uppercase tracking-widest text-primary border-primary/40">
            Contacto
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hablemos</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Estoy abierto a oportunidades laborales, proyectos freelance o simplemente charlar sobre tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {contactLinks.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-border/50 group-hover:border-primary/40 transition-colors bg-secondary/20">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{value}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <a href="mailto:kevin4000100@gmail.com">
              <Mail size={16} className="mr-2" /> Enviar un mensaje
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
