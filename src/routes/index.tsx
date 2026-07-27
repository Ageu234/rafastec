import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Cpu, Wrench, Gauge, PackageCheck, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/rafas/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { CATEGORIAS_POR_USO } from "@/lib/catalogo";
import founder from "@/assets/rafas-founder.asset.json";

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
          src={founder.url}
          alt="Fundador da RAFAS na bancada de montagem"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/40"
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
            <p className="reveal-line mt-7 max-w-xl text-[17px] leading-relaxed text-titanium-dark">
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
                  <span className="font-mono text-[12px] text-titanium-dark">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-[24px] font-semibold">{c.nome}</h3>
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
          <dl className="divide-y divide-graphite-light border-y border-graphite-light">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-[16px] font-medium">{f.q}</dt>
                <dd className="mt-2 max-w-2xl text-[14px] leading-relaxed text-titanium-dark">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
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
