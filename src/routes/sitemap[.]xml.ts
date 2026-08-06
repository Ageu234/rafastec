import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_STOREFRONT_URL,
} from "@/lib/shopify";

const BASE_URL = "https://rafastec.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const HANDLES_QUERY = `
  query SitemapProducts($first: Int!) {
    products(first: $first) {
      edges { node { handle } }
    }
  }
`;

async function fetchProductHandles(): Promise<string[]> {
  try {
    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: HANDLES_QUERY, variables: { first: 250 } }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      data?: { products?: { edges?: Array<{ node?: { handle?: string } }> } };
    };
    return (data.data?.products?.edges ?? [])
      .map((e) => e.node?.handle)
      .filter((h): h is string => Boolean(h));
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/loja", changefreq: "daily", priority: "0.9" },
          { path: "/sobre", changefreq: "monthly", priority: "0.7" },
          { path: "/processo", changefreq: "monthly", priority: "0.6" },
          { path: "/contacto", changefreq: "monthly", priority: "0.6" },
        ];

        for (const handle of await fetchProductHandles()) {
          entries.push({
            path: `/produto/${encodeURIComponent(handle)}`,
            changefreq: "daily",
            priority: "0.8",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
