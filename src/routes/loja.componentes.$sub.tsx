import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "@/components/rafas/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { getSubcategoria } from "@/lib/catalogo";

export const Route = createFileRoute("/loja/componentes/$sub")({
  loader: ({ params }) => {
    const sub = getSubcategoria(params.sub);
    if (!sub) throw notFound();
    return { sub };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Indisponível — RAFAS" }, { name: "robots", content: "noindex" }] };
    }
    const { nome } = loaderData.sub;
    const desc = `${nome} seleccionados pela RAFAS, com preços em Kwanza e validação técnica.`;
    return {
      meta: [
        { title: `${nome} — Componentes RAFAS` },
        { name: "description", content: desc },
        { property: "og:title", content: `${nome} — Componentes RAFAS` },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/loja/componentes/${params.sub}` },
      ],
      links: [{ rel: "canonical", href: `/loja/componentes/${params.sub}` }],
    };
  },
  component: SubcategoriaPage,
});

function SubcategoriaPage() {
  const { sub } = Route.useLoaderData();

  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos", "componentes", sub.slug],
    queryFn: () => fetchProducts(60, sub.query),
  });

  return (
    <div className="container-rafas section-y">
      <nav className="font-mono text-[12px] text-titanium-dark">
        <Link to="/" className="hover:text-electric">
          Início
        </Link>{" "}
        /{" "}
        <Link to="/loja" className="hover:text-electric">
          Loja
        </Link>{" "}
        /{" "}
        <Link to="/loja/$categoria" params={{ categoria: "componentes" }} className="hover:text-electric">
          Componentes
        </Link>{" "}
        / {sub.nome}
      </nav>

      <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em]">
        {sub.nome}
      </h1>

      <div className="mt-12">
        <ProductGrid products={produtos} isLoading={isLoading} />
      </div>
    </div>
  );
}
