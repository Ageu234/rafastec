import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "@/components/rafas/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { getCategoria } from "@/lib/catalogo";

export const Route = createFileRoute("/loja/$categoria")({
  loader: ({ params }) => {
    const categoria = getCategoria(params.categoria);
    if (!categoria) throw notFound();
    return { categoria };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Indisponível — RAFAS" }, { name: "robots", content: "noindex" }] };
    }
    const { nome, descricao } = loaderData.categoria;
    return {
      meta: [
        { title: `${nome} — RAFAS` },
        { name: "description", content: `${descricao} Catálogo RAFAS com preços em Kwanza.` },
        { property: "og:title", content: `${nome} — RAFAS` },
        { property: "og:description", content: descricao },
        { property: "og:url", content: `/loja/${params.categoria}` },
      ],
      links: [{ rel: "canonical", href: `/loja/${params.categoria}` }],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { categoria } = Route.useLoaderData();

  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos", categoria.slug],
    queryFn: () => fetchProducts(60, categoria.query),
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
        / {categoria.nome}
      </nav>

      <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em]">
        {categoria.nome}
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-titanium-dark">
        {categoria.descricao}
      </p>

      {categoria.subcategorias && (
        <div className="mt-10 flex flex-wrap gap-2">
          {categoria.subcategorias.map((s) => (
            <Link
              key={s.slug}
              to="/loja/componentes/$sub"
              params={{ sub: s.slug }}
              className="rounded-[10px] border border-graphite-light px-4 py-2 text-[13px] text-titanium-dark transition-colors hover:border-electric hover:text-electric"
            >
              {s.nome}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <ProductGrid products={produtos} isLoading={isLoading} />
      </div>
    </div>
  );
}
