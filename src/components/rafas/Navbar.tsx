import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { CATEGORIAS, CATEGORIAS_POR_USO, getCategoria } from "@/lib/catalogo";
import wordmark from "@/assets/rafas-wordmark.jpg.asset.json";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const componentes = getCategoria("componentes");

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-light/60 bg-obsidian/80 backdrop-blur-xl">
      <div className="container-rafas grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden items-center gap-8 lg:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 py-5 text-[14px] text-titanium transition-colors hover:text-electric">
              Loja <ChevronDown className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full w-[820px] -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="grid grid-cols-4 gap-8 rounded-[16px] border border-graphite-light bg-graphite p-8 shadow-2xl">
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

          <Link to="/processo" className="text-[14px] text-titanium hover:text-electric">
            Processo
          </Link>
          <Link to="/sobre" className="text-[14px] text-titanium hover:text-electric">
            Sobre
          </Link>
          <Link to="/contacto" className="text-[14px] text-titanium hover:text-electric">
            Contacto
          </Link>
        </nav>

        <Link to="/" className="col-start-2 flex items-center justify-center">
          <img
            src={wordmark.url}
            alt="RAFAS Gaming"
            className="h-9 w-auto mix-blend-screen md:h-11"
          />
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <CartDrawer />
          <button
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center text-titanium lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
          </div>
        </div>
      )}
    </header>
  );
}
