import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Cpu, Wrench, Gauge, PackageCheck, HeadphonesIcon, Gamepad2, MonitorCog, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/rafas/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { CATEGORIAS_POR_USO } from "@/lib/catalogo";
import heroImg from "@/assets/rafas-hero.jpg";
import team1 from "@/assets/rafas-team-1.jpg";
import team2 from "@/assets/rafas-team-2.jpg";
import { FaqAccordion } from "@/components/rafas/FaqAccordion";
import { WHATSAPP_LINK, WhatsAppIcon } from "@/components/rafas/WhatsAppButton";
import { BrandMarquee } from "@/components/rafas/BrandMarquee";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAFAS — Hardware de alta performance em Angola" },
      {
        name: "description",
        content:
          "Workstations, sistemas gaming e máquinas de IA especificadas, montadas e validadas à mão em Luanda. Engineered for Performance.",
      },
      { property: "og:title", content: "RAFAS — Hardware de alta performance em Angola" },
      {
        property: "og:description",
        content:
          "Workstations, sistemas gaming e máquinas de IA especificadas, montadas e validadas à mão em Luanda. Engineered for Performance.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const TRUST = [
  { icon: Wrench, label: "Montagem à mão", value: "100%" },
  { icon: Gauge, label: "Burn-in validado", value: "48h" },
  { icon: ShieldCheck, label: "Garantia local", value: "24 meses" },
  { icon: PackageCheck, label: "Entrega em Luanda", value: "48–72h" },
];

const PROCESSO = [
  {
    n: "01",
    titulo: "Diagnóstico de uso",
    texto:
      "Falamos sobre o software que corre, os ficheiros que abre e os prazos que tem. A máquina nasce do problema, não do catálogo.",
  },
  {
    n: "02",
    titulo: "Especificação técnica",
    texto:
      "Escolhemos cada componente por dados: consumo, térmica, largura de banda e headroom para os próximos três anos.",
  },
  {
    n: "03",
    titulo: "Montagem e cablagem",
    texto:
      "Montagem manual, gestão de cabos e curvas de ventoinha afinadas em bancada — sem atalhos, sem improviso.",
  },
  {
    n: "04",
    titulo: "Validação e entrega",
    texto:
      "48h de burn-in, relatório de temperaturas e benchmarks entregues consigo. Sabe exactamente o que comprou.",
  },
];

const FAQ = [
  {
    q: "Trabalham com orçamentos abaixo de gama alta?",
    a: "Sim. O critério não é o preço, é a coerência: preferimos uma configuração equilibrada a uma peça cara mal acompanhada.",
  },
  {
    q: "Fazem upgrade de máquinas existentes?",
    a: "Fazemos. Avaliamos a plataforma actual e dizemos honestamente se compensa fazer upgrade ou recomeçar.",
  },
  {
    q: "Como funciona a garantia em Angola?",
    a: "Garantia local de 24 meses na montagem, com acompanhamento directo connosco em Luanda — sem intermediários.",
  },
  {
    q: "Entregam fora de Luanda?",
    a: "Sim, com embalagem reforçada específica para transporte de sistemas montados. O prazo é confirmado no checkout.",
  },
];

const PORQUE = [
  {
    q: "Montagem feita por quem percebe",
    a: "Não há estagiários nem linha de produção: quem monta a sua máquina é quem a especificou e quem lhe dá suporte depois.",
  },
  {
    q: "Peças originais e compatíveis",
    a: "Trabalhamos apenas com componentes originais, verificados um a um em termos de consumo, térmica e compatibilidade.",
  },
  {
    q: "Testes reais antes de sair da oficina",
    a: "48 horas de burn-in, stress test de CPU e GPU e relatório de temperaturas entregue consigo.",
  },
  {
    q: "Suporte local em Luanda",
    a: "Garantia de 24 meses na montagem e uma pessoa com nome do outro lado do WhatsApp — sem call center.",
  },
];


function Index() {
  const { data: destaques = [], isLoading } = useQuery({
    queryKey: ["produtos", "destaques"],
    queryFn: () => fetchProducts(6),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-graphite-light">
        <img
          src={heroImg}
          alt="Fundador da RAFAS ao lado de um sistema montado à mão"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] lg:object-[75%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-obsidian/75 lg:bg-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian/85 lg:bg-gradient-to-r lg:from-obsidian lg:via-obsidian/85 lg:to-obsidian/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_70%_-10%,rgba(10,95,255,0.18),transparent_70%)]"
        />
        <div className="container-rafas relative flex min-h-[70vh] flex-col justify-center py-24 lg:min-h-[80vh] lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow reveal-line">Luanda · Angola</p>

            <h1 className="reveal-line mt-6 text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
              Engenharia,
              <br />
              não montagem.
            </h1>
            <p className="reveal-line mt-7 max-w-xl text-[17px] leading-relaxed text-titanium">
              A RAFAS constrói workstations, sistemas gaming e máquinas de IA especificadas ao
              milímetro para o trabalho que tem em mãos — e entrega-lhe os dados que provam que
              funcionam.
            </p>

            <div className="reveal-line mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/loja">
                  Ver máquinas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/processo">Como trabalhamos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Trust bar */}
      <section className="border-b border-graphite-light bg-graphite/40">
        <div className="container-rafas grid grid-cols-2 gap-px lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 py-7">
              <Icon className="h-5 w-5 text-electric" />
              <div>
                <p className="font-mono text-[16px] font-medium">{value}</p>
                <p className="text-[13px] text-titanium-dark">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marcas parceiras */}
      <section className="border-b border-graphite-light">
        <div className="py-12">
          <p className="container-rafas text-center text-[13px] text-titanium-dark">
            Trabalhamos com componentes das marcas em que confiamos
          </p>
          <BrandMarquee />
        </div>
      </section>



      {/* Feito para si */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[20px] border border-graphite-light">
              <img
                src={team1}
                alt="Técnico da RAFAS Gaming ao lado de um PC montado à mão"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-[16px] border border-graphite-light bg-graphite px-6 py-5 sm:block">
              <p className="font-mono text-[22px] font-medium text-electric">+300</p>
              <p className="text-[13px] text-titanium-dark">sistemas entregues</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Feito para si</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em]">
              A máquina é sua. A engenharia é nossa.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-titanium-dark">
              Cada build RAFAS começa numa conversa e termina numa bancada de testes. Escolhe o uso,
              nós escolhemos as peças, montamos à mão e entregamos com relatório técnico.
            </p>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Cpu, t: "Especificação sob medida" },
                { icon: Wrench, t: "Montagem manual e cablagem limpa" },
                { icon: Gauge, t: "48h de burn-in antes da entrega" },
                { icon: ShieldCheck, t: "Garantia local de 24 meses" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-start gap-3 rounded-[12px] border border-graphite-light bg-graphite p-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
                  <span className="text-[14px] leading-snug text-titanium">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/loja">Montar a minha máquina</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Porquê escolher a RAFAS */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Porquê a RAFAS</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em]">
              Porquê escolher a RAFAS Gaming?
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-titanium-dark">
              Quatro razões pelas quais os nossos clientes em Luanda não voltam a comprar às cegas.
            </p>
            <div className="mt-9">
              <FaqAccordion items={PORQUE} />
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-graphite-light">
            <img
              src={team2}
              alt="Montagem de um PC gaming branco na bancada da RAFAS Gaming"
              className="aspect-[4/5] w-full object-cover lg:aspect-[4/4.4]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Categorias por uso */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas">
          <p className="eyebrow">Escolha pelo trabalho</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em]">
            Três formas de exigir performance.
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {CATEGORIAS_POR_USO.map((c, i) => (
              <Link
                key={c.slug}
                to="/loja/$categoria"
                params={{ categoria: c.slug }}
                className="group flex flex-col justify-between rounded-[16px] border border-graphite-light bg-graphite p-8 transition-colors hover:border-electric"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-graphite-light bg-obsidian text-electric transition-colors group-hover:border-electric">
                      {(() => {
                        const Icon = [Gamepad2, MonitorCog, BrainCircuit][i] ?? Cpu;
                        return <Icon className="h-5 w-5" />;
                      })()}
                    </span>
                    <span className="font-mono text-[12px] text-titanium-dark">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[24px] font-semibold">{c.nome}</h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-titanium-dark">
                    {c.descricao}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-[14px] text-electric">
                  Explorar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em]">
                Sistemas em destaque
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/loja">Ver tudo</Link>
            </Button>
          </div>

          <div className="mt-12">
            <ProductGrid products={destaques} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Processo</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em]">
              Quatro etapas, zero improviso.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-titanium-dark">
              Não vendemos caixas. Desenhamos uma máquina em torno de um problema concreto e
              provamos, com dados, que o resolve.
            </p>
          </div>

          <ol className="grid gap-px sm:grid-cols-2">
            {PROCESSO.map((p) => (
              <li key={p.n} className="rounded-[16px] border border-graphite-light bg-graphite p-7">
                <span className="font-mono text-[13px] text-electric">{p.n}</span>
                <h3 className="mt-3 text-[18px] font-semibold">{p.titulo}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-titanium-dark">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas max-w-3xl">
          <p className="eyebrow">Manifesto</p>
          <p className="mt-6 text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-[-0.02em]">
            Em Angola, comprar hardware sério significou durante demasiado tempo aceitar
            aproximações. A RAFAS existe para acabar com isso:{" "}
            <span className="text-electric">precisão em vez de promessas</span>, medições em vez de
            adjectivos, e uma pessoa com nome do outro lado da mesa.
          </p>
        </div>
      </section>

      {/* Especificações / diferenciais */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Cpu,
              titulo: "Componentes escolhidos por dados",
              texto:
                "Cada peça é justificada por consumo, térmica e largura de banda — nunca por moda ou margem.",
            },
            {
              icon: Gauge,
              titulo: "Relatório de validação",
              texto:
                "Recebe temperaturas sob carga, estabilidade de clocks e benchmarks reais da sua máquina.",
            },
            {
              icon: HeadphonesIcon,
              titulo: "Suporte directo",
              texto:
                "Fala com quem montou a máquina. Sem call center, sem tickets perdidos, sem intermediários.",
            },
          ].map(({ icon: Icon, titulo, texto }) => (
            <div key={titulo} className="rounded-[16px] border border-graphite-light bg-graphite p-8">
              <Icon className="h-5 w-5 text-electric" />
              <h3 className="mt-5 text-[18px] font-semibold">{titulo}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-titanium-dark">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Perguntas</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em]">
              Antes de decidir.
            </h2>
          </div>
          <FaqAccordion items={FAQ} />

        </div>
      </section>

      {/* CTA final */}
      <section className="section-y">
        <div className="container-rafas">
          <div className="relative overflow-hidden rounded-[24px] border border-graphite-light bg-graphite px-8 py-16 text-center lg:px-16">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(10,95,255,0.16),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em]">
                Diga-nos o que precisa de correr. Nós tratamos do resto.
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link to="/contacto">Falar com a RAFAS</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/loja">Ver catálogo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
