import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Instagram, Wrench, ShieldCheck, Gauge, Cpu, PackageCheck, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import founder from "@/assets/rafas-founder.avif";
import team1 from "@/assets/rafas-team-1.jpg";
import team2 from "@/assets/rafas-team-2.jpg";
import { PageHero } from "@/components/rafas/PageHero";
import { WHATSAPP_LINK, WhatsAppIcon } from "@/components/rafas/WhatsAppButton";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a RAFAS Gaming — Engenharia de hardware em Angola" },
      {
        name: "description",
        content:
          "A história, os valores e as pessoas por trás da RAFAS Gaming: precisão, transparência e performance mensurável em Luanda.",
      },
      { property: "og:title", content: "Sobre a RAFAS Gaming" },
      {
        property: "og:description",
        content: "Precisão, transparência e performance mensurável — a boutique de hardware de Luanda.",
      },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

const VALORES = [
  { icon: Cpu, titulo: "Precisão", texto: "Cada decisão técnica é justificada com números, não com opinião." },
  { icon: Wrench, titulo: "Engenharia", texto: "Desenhamos sistemas, não listas de compras." },
  { icon: Gauge, titulo: "Transparência", texto: "Mostramos o que está dentro, quanto custa e porquê." },
  { icon: PackageCheck, titulo: "Elegância", texto: "A máquina certa é discreta, silenciosa e bem construída." },
  { icon: ShieldCheck, titulo: "Fiabilidade", texto: "Validação em bancada antes de sair da oficina." },
  { icon: HeadphonesIcon, titulo: "Suporte", texto: "Fala sempre com quem montou a sua máquina." },
];

const NUMEROS = [
  { v: "+300", l: "sistemas entregues" },
  { v: "48h", l: "de burn-in por máquina" },
  { v: "24", l: "meses de garantia local" },
  { v: "100%", l: "montagem à mão" },
];

function Sobre() {
  return (
    <>
      <PageHero title="Conheça a RAFAS Gaming" crumbs={[{ label: "Sobre nós" }]} />

      {/* Missão */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Sobre nós</p>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.025em]">
              Estamos numa missão para levar performance real a Angola
            </h2>
            <p className="mt-7 text-[16px] leading-relaxed text-titanium-dark">
              A RAFAS Gaming nasceu de uma frustração simples: em Angola, quem precisava de uma
              máquina séria acabava sempre a aceitar aproximações — peças mal combinadas, promessas
              sem medição e suporte que desaparece depois da venda.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-titanium-dark">
              Construímos a RAFAS para o oposto disso. Especificamos cada sistema em torno do
              trabalho real do cliente, montamos à mão, validamos em bancada e entregamos os dados
              que provam o resultado.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/loja">Ver o catálogo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar connosco
                </a>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-graphite-light">
            <img
              src={team2}
              alt="Fundador da RAFAS Gaming a apresentar um PC montado à mão"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="border-b border-graphite-light bg-graphite/40">
        <div className="container-rafas grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {NUMEROS.map((n) => (
            <div key={n.l}>
              <p className="font-mono text-[28px] font-medium text-electric">{n.v}</p>
              <p className="mt-1 text-[13px] text-titanium-dark">{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* História */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="order-2 overflow-hidden rounded-[20px] border border-graphite-light lg:order-1">
            <img
              src={team1}
              alt="Bancada de montagem da RAFAS Gaming em Luanda"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">A história</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
              Nossa história
            </h2>
            <p className="mt-7 text-[16px] leading-relaxed text-titanium-dark">
              Começámos pequenos, em Luanda, a montar máquinas para amigos que queriam jogar sem
              engasgos e para criadores que perdiam horas em renders. O boca-a-boca fez o resto.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-titanium-dark">
              Hoje montamos workstations, sistemas gaming e máquinas de IA — cada uma com relatório
              técnico, garantia local e uma pessoa com nome do outro lado do telefone.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas">
          <p className="eyebrow">Valores</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em]">
            O que nos guia
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="rounded-[16px] border border-graphite-light bg-graphite p-7">
                <Icon className="h-5 w-5 text-electric" />
                <h3 className="mt-5 text-[18px] font-semibold">{titulo}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-titanium-dark">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="section-y">
        <div className="container-rafas grid gap-8 lg:grid-cols-2">
          <div className="rounded-[20px] border border-graphite-light bg-graphite p-9">
            <p className="eyebrow">Contacto</p>
            <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.02em]">
              Precisa de ajuda?
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-titanium-dark">
              Fale directamente com a equipa RAFAS Gaming. Respondemos em horário comercial, todos os
              dias úteis.
            </p>
            <ul className="mt-8 space-y-5 text-[15px] text-titanium-dark">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-electric" /> Luanda, Angola
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-electric" />
                <a href="tel:+244947005277" className="hover:text-electric">+244 947 005 277</a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-electric" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-electric">
                  WhatsApp: +244 947 005 277
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-4 w-4 shrink-0 text-electric" /> Redes sociais: Rafas Gaming
              </li>
            </ul>
            <Button asChild size="lg" className="mt-9">
              <Link to="/contacto">Enviar mensagem</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-graphite-light">
            <img
              src={founder}
              alt="Equipa RAFAS Gaming"
              className="h-full min-h-[320px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
