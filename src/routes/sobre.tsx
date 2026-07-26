import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import founder from "@/assets/rafas-founder.asset.json";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a RAFAS — Engenharia de hardware em Angola" },
      {
        name: "description",
        content:
          "A história, os valores e as pessoas por trás da RAFAS: precisão, transparência e performance mensurável em Luanda.",
      },
      { property: "og:title", content: "Sobre a RAFAS" },
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
  ["Precisão", "Cada decisão técnica é justificada com números, não com opinião."],
  ["Engenharia", "Desenhamos sistemas, não listas de compras."],
  ["Transparência", "Mostramos o que está dentro, quanto custa e porquê."],
  ["Elegância", "A máquina certa é discreta, silenciosa e bem construída."],
  ["Fiabilidade", "Validação em bancada antes de sair da oficina."],
  ["Performance", "Medida, comparada e entregue por escrito."],
];

function Sobre() {
  return (
    <>
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Sobre</p>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.025em]">
              Uma boutique de engenharia,
              <br />
              feita em Luanda.
            </h1>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-titanium-dark">
              A RAFAS nasceu de uma frustração simples: em Angola, quem precisava de uma máquina
              séria acabava sempre a aceitar aproximações — peças mal combinadas, promessas sem
              medição e suporte que desaparece depois da venda.
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-titanium-dark">
              Construímos a RAFAS para o oposto disso. Especificamos cada sistema em torno do
              trabalho real do cliente, montamos à mão, validamos em bancada e entregamos os dados
              que provam o resultado.
            </p>
            <Button asChild size="lg" className="mt-9">
              <Link to="/loja">Ver o catálogo</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-graphite-light bg-graphite">
            <img src={founder.url} alt="Fundador da RAFAS" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-rafas">
          <p className="eyebrow">Valores</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map(([titulo, texto]) => (
              <div key={titulo} className="rounded-[16px] border border-graphite-light bg-graphite p-7">
                <h2 className="text-[18px] font-semibold">{titulo}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-titanium-dark">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
