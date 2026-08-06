import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Instagram, Wrench, ShieldCheck, Gauge, Cpu, PackageCheck, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import founder from "@/assets/rafas-founder.avif";
import team1 from "@/assets/rafas-team-1.jpg";
import team2 from "@/assets/rafas-team-2.jpg";
import { PageHero } from "@/components/rafas/PageHero";
import { FaqAccordion } from "@/components/rafas/FaqAccordion";
import pcsValores from "@/assets/rafas-pcs-valores.png";
import oficinaVideo from "@/assets/rafas-oficina.mp4";
import oficinaPoster from "@/assets/rafas-oficina-poster.jpg";
import { WHATSAPP_LINK, WhatsAppIcon } from "@/components/rafas/WhatsAppButton";
import { Testimonials, type Testimonial } from "@/components/rafas/Testimonials";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d18aa587-1e10-464e-85d9-fe8fd8546437/id-preview-23ebf174--3ff80a93-a4e4-4ba6-8d20-77c0077e7258.lovable.app-1785165216210.png";

const FAQ_SOBRE = [
  {
    q: "Como funciona o envio e em quanto tempo recebo?",
    a: "Em Luanda entregamos em mão em 24 a 48 horas úteis após a validação em bancada. Para as restantes províncias enviamos por transportadora parceira, com embalagem reforçada e número de seguimento, normalmente em 3 a 7 dias úteis. O custo é calculado no checkout consoante a zona.",
  },
  {
    q: "Qual é a garantia das máquinas e componentes?",
    a: "Todos os sistemas montados pela RAFAS Gaming têm 24 meses de garantia local em mão de obra e montagem; os componentes seguem a garantia do fabricante (12 a 36 meses). A garantia cobre defeitos de fabrico e falhas de funcionamento, não danos por queda, líquidos, sobretensão ou intervenções de terceiros.",
  },
  {
    q: "Posso devolver ou trocar se não for o que esperava?",
    a: "Sim. Tem 14 dias a contar da entrega para pedir devolução ou troca, desde que o produto esteja completo, sem danos e com a embalagem original. Sistemas configurados por medida podem ter uma taxa de reposição de componentes; explicamos sempre o valor antes de avançar.",
  },
  {
    q: "Como abro um pedido de assistência ou garantia?",
    a: "Fale connosco pelo WhatsApp +244 947 005 277 com o número de encomenda e uma descrição do problema. Fazemos primeiro um diagnóstico remoto; se for necessário, recolhemos a máquina em Luanda ou coordenamos o envio a partir da sua província.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos transferência bancária, Multicaixa Express e pagamento com cartão no checkout. Para empresas emitimos factura com os dados fiscais e o IVA aplicável.",
  },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a RAFAS Gaming — PCs montados à mão em Luanda" },
      {
        name: "description",
        content:
          "Conheça a RAFAS Gaming: oficina de Luanda que monta PCs gaming, workstations e máquinas de IA à mão, com 48h de burn-in, 24 meses de garantia e suporte directo.",
      },
      {
        name: "keywords",
        content:
          "RAFAS Gaming, PC gamer Angola, workstation Luanda, montagem de PC, hardware Angola",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RAFAS Gaming" },
      { property: "og:locale", content: "pt_AO" },
      { property: "og:title", content: "Sobre a RAFAS Gaming — PCs montados à mão em Luanda" },
      {
        property: "og:description",
        content:
          "Precisão, transparência e performance mensurável — a boutique de hardware de Luanda, com garantia local e suporte directo.",
      },
      { property: "og:url", content: "/sobre" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Equipa RAFAS Gaming na oficina em Luanda" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sobre a RAFAS Gaming — PCs montados à mão em Luanda" },
      {
        name: "twitter:description",
        content:
          "Oficina de Luanda: PCs gaming, workstations e máquinas de IA com burn-in de 48h e 24 meses de garantia.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              name: "Sobre a RAFAS Gaming",
              url: "/sobre",
              about: {
                "@type": "LocalBusiness",
                name: "RAFAS Gaming",
                image: OG_IMAGE,
                telephone: "+244947005277",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Luanda",
                  addressCountry: "AO",
                },
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_SOBRE.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
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

/** Depoimentos reais de clientes. Envie-me os textos, nomes e estrelas para os publicar aqui. */
const DEPOIMENTOS: Testimonial[] = [];

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

      {/* Vídeo */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[20px] border border-graphite-light bg-graphite">
            <video
              src={oficinaVideo}
              poster={oficinaPoster}
              autoPlay
              playsInline
              muted
              loop
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Por dentro</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
              Veja como trabalhamos
            </h2>
            <p className="mt-7 text-[16px] leading-relaxed text-titanium-dark">
              Cada máquina passa pela nossa bancada em Luanda: cable management feito à mão, montagem
              peça a peça e testes de temperatura antes de sair da oficina.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-titanium-dark">
              É este cuidado que separa uma montagem apressada de um sistema pensado para durar anos.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Valores</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em]">
              O que nos guia
            </h2>
            <div className="mt-8">
              <FaqAccordion items={VALORES.map((v) => ({ q: v.titulo, a: v.texto }))} />
            </div>
          </div>
          <img
            src={pcsValores}
            alt="Gabinetes gaming personalizados montados pela RAFAS Gaming"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>

      {/* Depoimentos */}
      <section className="section-y border-b border-graphite-light bg-graphite/40">
        <div className="container-rafas">
          <div className="max-w-2xl">
            <p className="eyebrow">Depoimentos</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em]">
              O que dizem os nossos clientes
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-titanium-dark">
              Gamers, criadores e empresas que confiaram a sua máquina à nossa bancada.
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <Testimonials items={DEPOIMENTOS} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em]">
              Envio, garantia e devoluções
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-titanium-dark">
              Tudo o que precisa de saber antes de encomendar. Se ficar alguma dúvida, fale connosco
              pelo WhatsApp.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-2 h-4 w-4" /> Tirar uma dúvida
              </a>
            </Button>
          </div>
          <FaqAccordion items={FAQ_SOBRE} />
        </div>
      </section>

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
