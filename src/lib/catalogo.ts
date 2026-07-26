export interface Categoria {
  slug: string;
  nome: string;
  descricao: string;
  /** Storefront API search query used to filter this category. */
  query: string;
  subcategorias?: Array<{ slug: string; nome: string; query: string }>;
}

const t = (tag: string, type: string) => `tag:${tag} OR product_type:'${type}'`;

export const CATEGORIAS: Categoria[] = [
  {
    slug: "workstations",
    nome: "Workstations",
    descricao: "Para quem cria, renderiza e não pode parar.",
    query: t("workstations", "Workstations"),
  },
  {
    slug: "gaming",
    nome: "Gaming de Alta Performance",
    descricao: "Para quem exige cada frame.",
    query: t("gaming", "Gaming"),
  },
  {
    slug: "ia-compute",
    nome: "IA & Compute",
    descricao: "Para quem treina o futuro.",
    query: t("ia-compute", "IA & Compute"),
  },
  {
    slug: "perifericos",
    nome: "Periféricos Premium",
    descricao: "Precisão também no que se toca todos os dias.",
    query: t("perifericos", "Periféricos"),
  },
  {
    slug: "componentes",
    nome: "Componentes",
    descricao: "Acesso directo ao catálogo, para quem já sabe o que procura.",
    query: t("componentes", "Componentes"),
    subcategorias: [
      { slug: "processadores", nome: "Processadores", query: t("processadores", "Processadores") },
      {
        slug: "placas-graficas",
        nome: "Placas Gráficas",
        query: t("placas-graficas", "Placas Gráficas"),
      },
      { slug: "motherboards", nome: "Motherboards", query: t("motherboards", "Motherboards") },
      { slug: "memoria-ram", nome: "Memória RAM", query: t("memoria-ram", "Memória RAM") },
      { slug: "armazenamento", nome: "Armazenamento", query: t("armazenamento", "Armazenamento") },
      {
        slug: "fontes-alimentacao",
        nome: "Fontes de Alimentação",
        query: t("fontes-alimentacao", "Fontes de Alimentação"),
      },
      { slug: "refrigeracao", nome: "Refrigeração", query: t("refrigeracao", "Refrigeração") },
      { slug: "caixas", nome: "Caixas", query: t("caixas", "Caixas") },
    ],
  },
];

export const CATEGORIAS_POR_USO = CATEGORIAS.slice(0, 3);

export function getCategoria(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getSubcategoria(slug: string) {
  return CATEGORIAS.find((c) => c.slug === "componentes")?.subcategorias?.find(
    (s) => s.slug === slug,
  );
}
