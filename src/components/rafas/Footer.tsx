import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Phone, MapPin } from "lucide-react";
import { CATEGORIAS, getCategoria } from "@/lib/catalogo";
import wordmark from "@/assets/rafas-wordmark.png";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";

const SOCIAIS = [
  { icon: Instagram, href: "https://instagram.com/rafasgaming", label: "Instagram Rafas Gaming" },
  { icon: Facebook, href: "https://facebook.com/rafasgaming", label: "Facebook Rafas Gaming" },
  { icon: Youtube, href: "https://youtube.com/@rafasgaming", label: "YouTube Rafas Gaming" },
];

export function Footer() {
  const componentes = getCategoria("componentes");

  return (
    <footer className="border-t border-graphite-light bg-obsidian">
      <div className="container-rafas grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="eyebrow">Loja</p>
          <ul className="mt-4 space-y-3 text-[14px] text-titanium-dark">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link to="/loja/$categoria" params={{ categoria: c.slug }} className="hover:text-electric">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Componentes</p>
          <ul className="mt-4 space-y-3 text-[14px] text-titanium-dark">
            {componentes?.subcategorias?.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/loja/componentes/$sub" params={{ sub: s.slug }} className="hover:text-electric">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">RAFAS</p>
          <ul className="mt-4 space-y-3 text-[14px] text-titanium-dark">
            <li><Link to="/sobre" className="hover:text-electric">Sobre nós</Link></li>
            <li><Link to="/processo" className="hover:text-electric">Processo de montagem</Link></li>
            <li><Link to="/contacto" className="hover:text-electric">Contacto</Link></li>
            <li><Link to="/loja" className="hover:text-electric">Catálogo completo</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contactos</p>
          <ul className="mt-4 space-y-3 text-[14px] text-titanium-dark">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-electric" />
              <a href="tel:+244947005277" className="hover:text-electric">+244 947 005 277</a>
            </li>
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-electric" />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-electric">
                WhatsApp directo
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-electric" /> Luanda, Angola
            </li>
          </ul>
          <p className="mt-6 text-[13px] text-titanium-dark">Redes sociais: <span className="text-titanium">Rafas Gaming</span></p>
        </div>
      </div>

      <div className="border-t border-graphite-light">
        <div className="container-rafas flex flex-col items-center gap-7 py-12">
          <Link to="/">
            <img src={wordmark} alt="RAFAS Gaming" className="h-14 w-auto md:h-20" />
          </Link>
          <div className="flex items-center gap-3">
            {SOCIAIS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-light text-titanium-dark transition-colors hover:border-electric hover:text-electric"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Rafas Gaming"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-light text-titanium-dark transition-colors hover:border-electric hover:text-electric"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-graphite-light">
        <div className="container-rafas flex flex-col gap-2 py-6 text-center font-mono text-[12px] text-titanium-dark md:flex-row md:items-center md:justify-between md:text-left">
          <span>© {new Date().getFullYear()} RAFAS Gaming — Engineered for Performance</span>
          <span>Luanda, Angola · Preços em Kwanza (AOA)</span>
        </div>
      </div>
    </footer>
  );
}
