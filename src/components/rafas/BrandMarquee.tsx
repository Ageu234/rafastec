import intel from "@/assets/marcas/intel.png";
import amd from "@/assets/marcas/amd.png";
import nvidia from "@/assets/marcas/nvidia.png";
import asus from "@/assets/marcas/asus.png";
import corsair from "@/assets/marcas/corsair.png";
import samsung from "@/assets/marcas/samsung.jpg";
import msi from "@/assets/marcas/msi.jpg";

const MARCAS = [
  { nome: "Intel", src: intel },
  { nome: "AMD", src: amd },
  { nome: "NVIDIA", src: nvidia },
  { nome: "ASUS ROG", src: asus },
  { nome: "Corsair", src: corsair },
  { nome: "Samsung", src: samsung },
  { nome: "MSI", src: msi },
];

export function BrandMarquee() {
  return (
    <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
        {[...MARCAS, ...MARCAS].map((m, i) => (
          <div
            key={`${m.nome}-${i}`}
            className="flex h-[76px] w-[168px] shrink-0 items-center justify-center rounded-[14px] border border-graphite-light bg-titanium/95 px-6 transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src={m.src}
              alt={`Logótipo ${m.nome}`}
              className="max-h-[44px] w-auto max-w-full object-contain"
              loading="lazy"
              aria-hidden={i >= MARCAS.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
