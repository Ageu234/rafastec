/**
 * Camada única de rastreamento (GA4 + Meta Pixel + TikTok Pixel).
 * Os IDs vêm de variáveis de ambiente públicas — sem ID, nada é carregado.
 */

export const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
export const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined;

type AnyWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: unknown };
  _fbq?: unknown;
  ttq?: { track: (...a: unknown[]) => void; page: () => void; load: (id: string) => void };
};

function w(): AnyWindow | null {
  return typeof window === "undefined" ? null : (window as AnyWindow);
}

let initialized = false;

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  s.id = id;
  document.head.appendChild(s);
}

export function initAnalytics() {
  const win = w();
  if (!win || initialized) return;
  initialized = true;

  // Google Analytics 4
  if (GA4_ID) {
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    win.gtag("js", new Date());
    win.gtag("config", GA4_ID, { send_page_view: false });
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, "ga4-script");
  }

  // Meta (Facebook) Pixel
  if (META_PIXEL_ID) {
    if (!win.fbq) {
      const n: AnyWindow["fbq"] = function (...args: unknown[]) {
        // @ts-expect-error dynamic pixel shim
        n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
      } as NonNullable<AnyWindow["fbq"]>;
      n.queue = [];
      n.loaded = true;
      n.version = "2.0";
      win.fbq = n;
      win._fbq = n;
    }
    injectScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
    win.fbq!("init", META_PIXEL_ID);
  }

  // TikTok Pixel
  if (TIKTOK_PIXEL_ID) {
    injectScript(
      `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${TIKTOK_PIXEL_ID}&lib=ttq`,
      "tiktok-pixel-script",
    );
  }
}

export function trackPageView(path: string) {
  const win = w();
  if (!win) return;
  win.gtag?.("event", "page_view", { page_path: path, page_location: win.location.href });
  win.fbq?.("track", "PageView");
  win.ttq?.page();
}

type Item = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
  category?: string;
};

export function trackViewItem(item: Item) {
  const win = w();
  if (!win) return;
  win.gtag?.("event", "view_item", {
    currency: item.currency,
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, item_category: item.category, price: item.price }],
  });
  win.fbq?.("track", "ViewContent", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    value: item.price,
    currency: item.currency,
  });
  win.ttq?.track("ViewContent", { content_id: item.id, value: item.price, currency: item.currency });
}

export function trackAddToCart(item: Item) {
  const win = w();
  if (!win) return;
  const quantity = item.quantity ?? 1;
  win.gtag?.("event", "add_to_cart", {
    currency: item.currency,
    value: item.price * quantity,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity }],
  });
  win.fbq?.("track", "AddToCart", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    value: item.price * quantity,
    currency: item.currency,
  });
  win.ttq?.track("AddToCart", {
    content_id: item.id,
    value: item.price * quantity,
    currency: item.currency,
  });
}

export function trackBeginCheckout(value: number, currency: string, items: Item[]) {
  const win = w();
  if (!win) return;
  win.gtag?.("event", "begin_checkout", {
    currency,
    value,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity ?? 1,
    })),
  });
  win.fbq?.("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.id),
    content_type: "product",
    value,
    currency,
    num_items: items.reduce((s, i) => s + (i.quantity ?? 1), 0),
  });
  win.ttq?.track("InitiateCheckout", { value, currency });
}

export function trackLead(source: string) {
  const win = w();
  if (!win) return;
  win.gtag?.("event", "generate_lead", { method: source });
  win.fbq?.("track", "Lead", { content_name: source });
  win.ttq?.track("SubmitForm", { content_name: source });
}
