import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopifyImageSrcSet, shopifyImageUrl } from "@/lib/shopify";

export type GalleryImage = { url: string; altText?: string | null };

const IMAGE_SIZES = "(max-width: 1024px) 100vw, 560px";

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const go = (next: number) => setIndex(((next % total) + total) % total);

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [total, index]);

  useEffect(() => {
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [index]);

  if (total === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[16px] border border-graphite-light bg-graphite font-mono text-xs text-titanium-dark">
        SEM IMAGEM
      </div>
    );
  }

  const current = images[index];

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden rounded-[16px] border border-graphite-light bg-graphite"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
        tabIndex={0}
        role="group"
        aria-label={`Galeria de imagens: ${title}`}
      >
        <picture>
          <source
            type="image/avif"
            srcSet={shopifyImageSrcSet(current.url, "avif")}
            sizes={IMAGE_SIZES}
          />
          <source
            type="image/webp"
            srcSet={shopifyImageSrcSet(current.url, "webp")}
            sizes={IMAGE_SIZES}
          />
          <img
            key={current.url}
            src={shopifyImageUrl(current.url, { width: 1080 })}
            srcSet={shopifyImageSrcSet(current.url)}
            sizes={IMAGE_SIZES}
            alt={current.altText ?? `${title} — imagem ${index + 1} de ${total}`}
            width={1080}
            height={1080}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="h-full w-full animate-in fade-in duration-300 object-contain p-4 sm:p-8"
          />
        </picture>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-graphite-light bg-obsidian/70 p-2.5 text-titanium backdrop-blur transition-colors hover:border-electric hover:text-electric"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Imagem seguinte"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-graphite-light bg-obsidian/70 p-2.5 text-titanium backdrop-blur transition-colors hover:border-electric hover:text-electric"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-graphite-light bg-obsidian/70 px-3 py-1 font-mono text-[11px] text-titanium-dark backdrop-blur">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          ref={thumbsRef}
          className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === index}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border bg-graphite transition-colors ${
                i === index
                  ? "border-electric"
                  : "border-graphite-light hover:border-titanium-dark"
              }`}
            >
              <img
                src={shopifyImageUrl(img.url, { width: 200, format: "webp" })}
                alt=""
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
