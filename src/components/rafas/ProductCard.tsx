import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { trackAddToCart } from "@/lib/analytics";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const p = product.node;
  const image = p.images?.edges?.[0]?.node;
  const variant = p.variants?.edges?.[0]?.node;
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
    <article className="group flex flex-col overflow-hidden rounded-[16px] border border-graphite-light bg-graphite">
      <Link
        to="/produto/$handle"
        params={{ handle: p.handle }}
        className="relative block aspect-4/3 overflow-hidden bg-obsidian"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-titanium-dark">
            SEM IMAGEM
          </div>
        )}
        {p.availableForSale === false && (
          <span className="absolute left-4 top-4 rounded-[6px] bg-obsidian/85 px-2 py-1 font-mono text-[11px] text-warning">
            SOB ENCOMENDA
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          {p.productType && <p className="eyebrow">{p.productType}</p>}
          <h3 className="mt-1 text-[20px] font-semibold leading-tight">
            <Link to="/produto/$handle" params={{ handle: p.handle }} className="hover:text-electric">
              {p.title}
            </Link>
          </h3>
          {p.description && (
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-titanium-dark">
              {p.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <span className="font-mono text-[15px] font-medium">
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          <Button size="sm" onClick={handleAddToCart} disabled={isLoading || !variant}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Adicionar"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  isLoading,
}: {
  products: ShopifyProduct[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[380px] animate-pulse rounded-[16px] bg-graphite" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[16px] border border-dashed border-graphite-light px-6 py-20 text-center">
        <p className="text-[18px] font-semibold">No products found</p>
        <p className="mx-auto mt-2 max-w-md text-[13px] text-titanium-dark">
          Ainda não existem produtos nesta secção. Diga no chat qual é o produto e o preço para o
          criarmos na sua loja Shopify.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
