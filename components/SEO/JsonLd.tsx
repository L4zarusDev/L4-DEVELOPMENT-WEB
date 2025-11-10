// components/SEO/JsonLd.tsx
'use client';

import Script from 'next/script';

interface JsonLdProps {
  data: object; // objeto JSON-LD ya construido
  id: string;   // id único del script para evitar duplicados
}

/**
 * JsonLd
 * ------------------------------------------------------------
 * Inyecta en el cliente un <script type="application/ld+json"> con los datos
 * que le pases. Útil para SEO (Organization, WebSite, FAQPage, etc.).
 *
 * - Usa `afterInteractive` porque no es crítico para el render
 * - `dangerouslySetInnerHTML` es required para JSON-LD
 *
 * Ejemplo:
 * <JsonLd id="org" data={buildOrganization(...)} />
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
