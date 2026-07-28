import { Link } from "@tanstack/react-router";
import hero from "@/assets/rafas-hero.jpg.asset.json";

type Crumb = { label: string; to?: string };

export function PageHero({
  title,
  crumbs = [],
  image,
}: {
  title: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-graphite-light">
      <img
        src={image ?? hero.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-obsidian/80" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/50"
      />
      <div className="container-rafas relative flex min-h-[240px] flex-col justify-center py-14 md:min-h-[300px]">
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.025em]">
          {title}
        </h1>
        <nav className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[12px] text-titanium-dark">
          <Link to="/" className="hover:text-electric">
            Início
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-graphite-light">/</span>
              {c.to ? (
                <Link to={c.to} className="hover:text-electric">
                  {c.label}
                </Link>
              ) : (
                <span className="text-titanium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
