import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { CATEGORIAS, CATEGORIAS_POR_USO, getCategoria } from "@/lib/catalogo";
import wordmark from "@/assets/rafas-wordmark.png";
import { WHATSAPP_LINK } from "./WhatsAppButton";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const componentes = getCategoria("componentes");

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-light/60 bg-obsidian/85 backdrop-blur-xl">
      {/* Top strip */}
      <div className="hidden border-b border-graphite-light/50 lg:block">
        <div className="container-rafas flex h-9 items-center justify-between font-mono text-[11px] tracking-[0.14em] text-titanium-dark">
          <span>LUANDA · ANGOLA · MONTAGEM E VALIDAÇÃO À MÃO</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-electric">
            <Phone className="h-3.5 w-3.5" /> +244 947 005 277
          </a>
        </div>
      </div>

      <div className="container-rafas grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: nav (desktop) / menu button (mobile) */}
        <div className="flex items-center">
          <button
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center text-titanium lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            <div className="group static">
              <button className="flex items-center gap-1 py-8 text-[14px] font-semibold uppercase tracking-[0.06em] text-titanium transition-colors hover:text-electric">
                Loja <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Mega menu — full width, aligned to the page container */}
              <div className="pointer-events-none absolute inset-x-0 top-full opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="container-rafas pt-2 pb-6">
                  <div className="grid grid-cols-4 gap-10 rounded-[16px] border border-graphite-light bg-graphite p-8 shadow-2xl">
                    <div>
                      <p className="eyebrow">Por uso</p>
                      <ul className="mt-4 space-y-3">
                        {CATEGORIAS_POR_USO.map((c) => (
                          <li key={c.slug}>
                            <Link
                              to="/loja/$categoria"
                              params={{ categoria: c.slug }}
                              className="text-[14px] text-titanium hover:text-electric"
                            >
                              {c.nome}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-2">
                      <p className="eyebrow">Componentes</p>
                      <ul className="mt-4 grid grid-cols-2 gap-3">
                        {componentes?.subcategorias?.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to="/loja/componentes/$sub"
                              params={{ sub: s.slug }}
                              className="text-[14px] text-titanium hover:text-electric"
                            >
                              {s.nome}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow">Serviços</p>
                      <ul className="mt-4 space-y-3 text-[14px] text-titanium">
                        <li>
                          <Link to="/loja/$categoria" params={{ categoria: "perifericos" }} className="hover:text-electric">
                            Periféricos
                          </Link>
                        </li>
                        <li>
                          <Link to="/processo" className="hover:text-electric">
                            Montagem RAFAS
                          </Link>
                        </li>
                        <li>
                          <Link to="/sobre" className="hover:text-electric">
                            Sobre a marca
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {[
              { to: "/processo", label: "Processo" },
              { to: "/sobre", label: "Sobre" },
              { to: "/contacto", label: "Contacto" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[14px] font-semibold uppercase tracking-[0.06em] text-titanium transition-colors hover:text-electric"
                activeProps={{ className: "text-electric" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: logo */}
        <Link to="/" className="flex items-center justify-center">
          <img src={wordmark} alt="RAFAS Gaming" className="h-9 w-auto md:h-[52px]" />
        </Link>

        {/* Right */}
        <div className="flex items-center justify-end gap-2">
          <CartDrawer />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-graphite-light bg-obsidian lg:hidden">
          <div className="container-rafas space-y-5 py-6">
            <div>
              <p className="eyebrow">Loja</p>
              <ul className="mt-3 space-y-3">
                {CATEGORIAS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/loja/$categoria"
                      params={{ categoria: c.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="text-[15px] text-titanium"
                    >
                      {c.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-3 border-t border-graphite-light pt-5 text-[15px] text-titanium">
              <li>
                <Link to="/processo" onClick={() => setMobileOpen(false)}>
                  Processo
                </Link>
              </li>
              <li>
                <Link to="/sobre" onClick={() => setMobileOpen(false)}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contacto" onClick={() => setMobileOpen(false)}>
                  Contacto
                </Link>
              </li>
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-graphite-light pt-5 font-mono text-[13px] text-electric"
            >
              +244 947 005 277
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
