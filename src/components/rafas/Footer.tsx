import { Link } from "@tanstack/react-router";
import { CATEGORIAS, getCategoria } from "@/lib/catalogo";
import logo from "@/assets/rafas-logo.asset.json";

export function Footer() {
  const componentes = getCategoria("componentes");

  return (
    <footer className="border-t border-graphite-light bg-obsidian">
      <div className="container-rafas grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo.url} alt="RAFAS" className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-titanium-dark">
            Engenharia de hardware de alta performance em Angola. Cada máquina é especificada,
            montada e validada à mão.
          </p>
        </div>

        <div>
          <p className="eyebrow">Loja</p>
          <ul className="mt-4 space-y-3 text-[14px] text-titanium-dark">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/loja/$categoria"
                  params={{ categoria: c.slug }}
                  className="hover:text-electric"
                >
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
            <li>
              <Link to="/sobre" className="hover:text-electric">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/processo" className="hover:text-electric">
                Processo de montagem
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-electric">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/loja" className="hover:text-electric">
                Catálogo completo
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite-light">
        <div className="container-rafas flex flex-col gap-2 py-6 font-mono text-[12px] text-titanium-dark md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} RAFAS — Engineered for Performance</span>
          <span>Luanda, Angola · Preços em Kwanza (AOA)</span>
        </div>
      </div>
    </footer>
  );
}
