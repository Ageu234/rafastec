import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type Testimonial = {
  nome: string;
  papel: string;
  estrelas: number;
  texto: string;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[20px] border border-graphite-light bg-graphite">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t) => (
            <figure key={t.nome} className="w-full shrink-0 p-8 sm:p-11">
              <Quote className="h-7 w-7 text-electric" aria-hidden="true" />
              <div
                className="mt-6 flex gap-1"
                aria-label={`${t.estrelas} de 5 estrelas`}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < t.estrelas
                        ? "fill-electric text-electric"
                        : "text-graphite-light"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-6 text-[16px] leading-relaxed text-titanium">
                “{t.texto}”
              </blockquote>
              <figcaption className="mt-7 text-[14px]">
                <span className="font-medium">{t.nome}</span>
                <span className="text-titanium-dark"> — {t.papel}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.nome}
              type="button"
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-electric" : "w-4 bg-graphite-light"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-light text-titanium transition-colors hover:border-electric hover:text-electric"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-light text-titanium transition-colors hover:border-electric hover:text-electric"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
