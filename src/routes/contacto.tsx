import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageHero } from "@/components/rafas/PageHero";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — RAFAS Luanda" },
      {
        name: "description",
        content:
          "Fale directamente com a equipa RAFAS em Luanda para especificar a sua workstation, sistema gaming ou máquina de IA.",
      },
      { property: "og:title", content: "Contacto — RAFAS Luanda" },
      {
        property: "og:description",
        content: "Fale com quem monta a máquina. Diagnóstico técnico sem compromisso.",
      },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Pedido registado", {
      description: "Entramos em contacto consigo dentro de 24 horas úteis.",
      position: "top-center",
    });
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHero title="Fale com a RAFAS" crumbs={[{ label: "Contacto" }]} />
    <section className="section-y">
      <div className="container-rafas grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.025em]">
            Diga-nos o que precisa de correr.
          </h2>
          <p className="mt-7 max-w-md text-[16px] leading-relaxed text-titanium-dark">
            Descreva o trabalho que a máquina vai fazer. Respondemos com uma proposta técnica
            fundamentada — sem compromisso.
          </p>

          <ul className="mt-10 space-y-5 text-[14px] text-titanium-dark">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-electric" /> Luanda, Angola
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-electric" />
              <a href="mailto:rafasgaming@proton.me" className="hover:text-electric">
                rafasgaming@proton.me
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-electric" />
              <a href="tel:+244947005277" className="hover:text-electric">
                +244 947 005 277
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[16px] border border-graphite-light bg-graphite p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" required placeholder="O seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="nome@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uso">Uso principal</Label>
            <Input id="uso" name="uso" placeholder="Ex.: render 3D, treino de modelos, gaming 1440p" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              rows={6}
              required
              placeholder="Descreva o software que usa, os ficheiros com que trabalha e o orçamento aproximado."
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Enviar pedido
          </Button>
          <p className="text-[12px] text-titanium-dark">
            Ao enviar concorda em ser contactado pela equipa RAFAS sobre este pedido.
          </p>
        </form>
      </div>
    </section>
    </>
  );
}
