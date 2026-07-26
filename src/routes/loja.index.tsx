import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "@/components/rafas/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { CATEGORIAS } from "@/lib/catalogo";

export const Route = createFileRoute("/loja/")({
  head: () => ({
    meta: [
      { title: "Loja — Catálogo RAFAS" },
      {
        name: "description",
        content:
          "Workstations, gaming, IA & compute, periféricos e componentes. Todo o catálogo RAFAS com preços em Kwanza.",
      },
      { property: "og:title", content: "Loja — Catálogo RAFAS" },
      {
        property: "og:description",
        content: "Todo o catálogo RAFAS: máquinas completas e componentes, com preços em Kwanza.",
      },
      { property: "og:url", content: "/loja" },
    ],
    links: [{ rel: "canonical", href: "/loja" }],
  }),
  component: Loja,
});

function Loja() {
  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos", "todos"],
    queryFn: () => fetchProducts(60),
  });

  return (
    <div className="container-rafas section-y">
      <nav className="font-mono text-[12px] text-titanium-dark">
        <Link to="/" className="hover:text-electric">
          Início
        </Link>{" "}
        / Loja
      </nav>

      <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em]">Catálogo</h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-titanium-dark">
        Máquinas completas e componentes individuais. Todos os preços em Kwanza, com validação
        técnica incluída.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => (
          <Link
            key={c.slug}
            to="/loja/$categoria"
            params={{ categoria: c.slug }}
            className="rounded-[10px] border border-graphite-light px-4 py-2 text-[13px] text-titanium-dark transition-colors hover:border-electric hover:text-electric"
          >
            {c.nome}
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <ProductGrid products={produtos} isLoading={isLoading} />
      </div>
    </div>
  );
}
