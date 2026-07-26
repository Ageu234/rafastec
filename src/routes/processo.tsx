import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/processo")({
  head: () => ({
    meta: [
      { title: "Processo de montagem — RAFAS" },
      {
        name: "description",
        content:
          "Diagnóstico, especificação, montagem manual e 48h de burn-in validado. O processo RAFAS, passo a passo.",
      },
      { property: "og:title", content: "Processo de montagem — RAFAS" },
      {
        property: "og:description",
        content: "Como especificamos, montamos e validamos cada máquina antes da entrega.",
      },
      { property: "og:url", content: "/processo" },
    ],
    links: [{ rel: "canonical", href: "/processo" }],
  }),
  component: Processo,
});

const ETAPAS = [
  {
    n: "01",
    titulo: "Diagnóstico de uso",
    texto:
      "Percebemos o software que corre, o tamanho dos ficheiros, os prazos e o ambiente onde a máquina vai viver. Sem isto, qualquer especificação é adivinhação.",
    detalhes: ["Entrevista técnica", "Análise da carga de trabalho", "Definição de orçamento real"],
  },
  {
    n: "02",
    titulo: "Especificação técnica",
    texto:
      "Cada componente é escolhido por consumo, térmica, largura de banda e margem de crescimento — e documentado para si.",
    detalhes: ["Simulação térmica", "Balanço CPU/GPU/RAM", "Headroom a 3 anos"],
  },
  {
    n: "03",
    titulo: "Montagem e cablagem",
    texto:
      "Montagem manual em bancada, gestão de cabos completa e curvas de ventoinha afinadas para o silêncio possível sem perder performance.",
    detalhes: ["Cablagem gerida", "Pasta térmica aplicada à mão", "Perfis de ventoinha afinados"],
  },
  {
    n: "04",
    titulo: "Validação e entrega",
    texto:
      "48 horas de burn-in com carga sustentada. Recebe temperaturas, estabilidade de clocks e benchmarks reais da sua máquina.",
    detalhes: ["Burn-in 48h", "Relatório térmico", "Benchmarks assinados"],
  },
];

function Processo() {
  return (
    <>
      <section className="section-y border-b border-graphite-light">
        <div className="container-rafas max-w-3xl">
          <p className="eyebrow">Processo</p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.025em]">
            Da conversa à bancada, sem improviso.
          </h1>
          <p className="mt-7 text-[16px] leading-relaxed text-titanium-dark">
            Nenhuma máquina RAFAS sai da oficina sem passar por estas quatro etapas. É isto que
            separa engenharia de montagem.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-rafas space-y-px">
          {ETAPAS.map((e) => (
            <article
              key={e.n}
              className="grid gap-8 rounded-[16px] border border-graphite-light bg-graphite p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start"
            >
              <span className="font-mono text-[13px] text-electric">{e.n}</span>
              <div>
                <h2 className="text-[22px] font-semibold">{e.titulo}</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-titanium-dark">
                  {e.texto}
                </p>
              </div>
              <ul className="space-y-2 font-mono text-[12px] text-titanium-dark lg:text-right">
                {e.detalhes.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}

          <div className="pt-12">
            <Button asChild size="lg">
              <Link to="/contacto">Iniciar um diagnóstico</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
