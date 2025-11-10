// components/SEO/builders.ts
// Utilidades para generar JSON-LD listo para incrustar en <script type="application/ld+json">
// La idea es centralizar aquí la estructura de Schema.org y sólo pasar datos
// desde las páginas o componentes.

/**
 * Construye un JSON-LD de tipo Organization
 */
export const buildOrganization = ({
  name,
  url,
  logo,
  sameAs = [],
}: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  logo,
  sameAs,
});

/**
 * Construye un JSON-LD de tipo WebSite
 * - Opcionalmente agrega SearchAction si pasas `searchUrl`
 */
export const buildWebsite = ({
  name,
  url,
  searchUrl,
}: {
  name: string;
  url: string;
  searchUrl?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
  ...(searchUrl && {
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),
});

/**
 * Construye un JSON-LD de tipo Service
 * - Útil para páginas de servicios / landing de agencia
 * - Puedes pasar ofertas para que se rendericen como Offer[]
 */
export const buildService = ({
  name,
  serviceType,
  providerName,
  url,
  areaServed,
  offers,
}: {
  name: string;
  serviceType?: string;
  providerName: string;
  url: string;
  areaServed?: string;
  offers?: { name: string; price: string; priceCurrency: string; url?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  ...(serviceType && { serviceType }),
  provider: { '@type': 'Organization', name: providerName },
  ...(areaServed && { areaServed: { '@type': 'Place', name: areaServed } }),
  ...(offers && {
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency,
      url: o.url || url,
      availability: 'https://schema.org/InStock',
    })),
  }),
});

/**
 * Construye breadcrumbs
 * - Pásale la base y un array de { name, path }
 */
export const buildBreadcrumbs = (
  baseUrl: string,
  items: { name: string; path: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${baseUrl}${it.path}`,
  })),
});

/**
 * Construye un FAQPage
 * - Cada pregunta debe tener { q, a }
 */
export const buildFAQ = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
