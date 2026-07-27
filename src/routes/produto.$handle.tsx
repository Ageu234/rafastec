import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatMoney } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { trackAddToCart, trackViewItem } from "@/lib/analytics";
import { useEffect } from "react";

export const Route = createFileRoute("/produto/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `Produto — RAFAS` },
      {
        name: "description",
        content: "Ficha técnica completa, validação em bancada e preço em Kwanza.",
      },
      { property: "og:title", content: "Produto — RAFAS" },
      {
        property: "og:description",
        content: "Ficha técnica completa, validação em bancada e preço em Kwanza.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/produto/${params.handle}` },
    ],
    links: [{ rel: "canonical", href: `/produto/${params.handle}` }],
  }),
  component: ProdutoPage,
});

function ProdutoPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["produto", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  useEffect(() => {
    const node = product?.node;
    if (!node) return;
    const v = node.variants?.edges?.[0]?.node;
    const money = v?.price ?? node.priceRange.minVariantPrice;
    trackViewItem({
      id: v?.id ?? node.id,
      name: node.title,
      price: parseFloat(money.amount),
      currency: money.currencyCode,
      category: node.productType,
    });
  }, [product]);

  if (isLoading) {
    return (
      <div className="container-rafas section-y">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-4/3 animate-pulse rounded-[16px] bg-graphite" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-graphite" />
            <div className="h-24 animate-pulse rounded bg-graphite" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-rafas section-y text-center">
        <h1 className="text-[28px] font-semibold">Produto não encontrado</h1>
        <p className="mt-3 text-titanium-dark">
          Este produto já não está disponível no catálogo.
        </p>
        <Button asChild className="mt-8">
          <Link to="/loja">Voltar à loja</Link>
        </Button>
      </div>
    );
  }

  const p = product.node;
  const images = p.images?.edges?.map((e) => e.node) ?? [];
  const variants = p.variants?.edges?.map((e) => e.node) ?? [];
  const variant = variants[variantIndex] ?? variants[0];
  const price = variant?.price ?? p.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    trackAddToCart({
      id: variant.id,
      name: p.title,
      price: parseFloat(variant.price.amount),
      currency: variant.price.currencyCode,
      quantity: 1,
      category: p.productType,
    });
    toast.success("Adicionado ao carrinho", { description: p.title, position: "top-center" });
  };

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
        / {p.title}
      </nav>

      <div className="mt-8 grid gap-14 lg:grid-cols-2">
        <div>
          <div className="aspect-4/3 overflow-hidden rounded-[16px] border border-graphite-light bg-graphite">
            {images[imageIndex] ? (
              <img
                src={images[imageIndex].url}
                alt={images[imageIndex].altText ?? p.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs text-titanium-dark">
                SEM IMAGEM
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setImageIndex(i)}
                  className={`h-20 w-20 overflow-hidden rounded-[10px] border ${
                    i === imageIndex ? "border-electric" : "border-graphite-light"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {p.productType && <p className="eyebrow">{p.productType}</p>}
          <h1 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            {p.title}
          </h1>

          <p className="mt-6 font-mono text-[24px] font-medium">
            {formatMoney(price.amount, price.currencyCode)}
          </p>

          {p.description && (
            <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-titanium-dark">
              {p.description}
            </p>
          )}

          {variants.length > 1 && (
            <div className="mt-8">
              <p className="eyebrow">Configuração</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIndex(i)}
                    disabled={!v.availableForSale}
                    className={`rounded-[10px] border px-4 py-2 text-[13px] transition-colors disabled:opacity-40 ${
                      i === variantIndex
                        ? "border-electric text-electric"
                        : "border-graphite-light text-titanium-dark hover:border-electric"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-9">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart} disabled={isAdding || !variant}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Adicionar ao carrinho"}
            </Button>
          </div>

          <ul className="mt-10 space-y-4 border-t border-graphite-light pt-8 text-[14px] text-titanium-dark">
            <li className="flex items-center gap-3">
              <Wrench className="h-4 w-4 text-electric" /> Montagem manual e cablagem RAFAS
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-electric" /> Garantia local de 24 meses
            </li>
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-electric" /> Entrega em Luanda em 48–72h
            </li>
          </ul>

          {(p.vendor || p.tags?.length) && (
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-graphite-light pt-8 font-mono text-[12px] text-titanium-dark">
              {p.vendor && (
                <div>
                  <dt className="text-titanium-dark/70">FABRICANTE</dt>
                  <dd className="mt-1 text-titanium">{p.vendor}</dd>
                </div>
              )}
              {p.tags && p.tags.length > 0 && (
                <div>
                  <dt className="text-titanium-dark/70">ETIQUETAS</dt>
                  <dd className="mt-1 text-titanium">{p.tags.join(", ")}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
