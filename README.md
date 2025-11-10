# 📚 Catálogo de componentes y funciones

Este documento describe los componentes React/Next.js, hooks, utilidades y datos de ejemplo usados en el proyecto. Sirve como guía rápida para saber **qué hace cada pieza**, **dónde encaja** y **qué props acepta**.

> ⚠️ Muchos componentes están pensados para **Next.js App Router** y **Tailwind**, y varios están marcados como `"use client"` porque usan estado, efectos o animaciones.

---

## 1. 📦 UI base (atoms / primitives)

### `components/ui/button.tsx`
**Qué es:** wrapper de botón basado en `class-variance-authority` (CVA).

**Props clave:**

- `variant`: `default | destructive | outline | secondary | ghost | link`
- `size`: `default | sm | lg | icon`
- `asChild?: boolean`

**Notas:**

- Estandariza todos los botones.
- Útil con Radix (pasando `asChild`).

---

### `components/ui/badge.tsx`
**Qué es:** etiqueta redondeada con variantes.

**Props clave:**

- `variant`: `default | secondary | destructive | outline`

**Uso típico:** estados, tags, “MRR $X”.

---

### `components/ui/card.tsx`
**Qué es:** set de primitivas de tarjeta.

**Incluye:**

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

**Uso:** layout consistente en tarjetas tipo dashboard.

---

### `components/ui/separator.tsx`
**Qué es:** wrapper de `@radix-ui/react-separator`.

**Props:**

- `orientation = "horizontal"` | `"vertical"`

---

### `components/ui/collapsible.tsx`
**Qué es:** re-export de Radix Collapsible (Root, Trigger, Content).

**Uso:** para mostrar/ocultar contenido secundario.

---

### `components/ui/accordion.tsx`
**Qué es:** wrapper de Radix Accordion con trigger ya estilizado.

**Props clave:**

- `Accordion`
- `AccordionItem`
- `AccordionTrigger` (rota el ícono)
- `AccordionContent`

**Uso:** FAQs y menús plegables.

---

## 2. 🧱 Layout / Visual FX

### `components/NoiseTexture.tsx`
**Qué es:** capa fija con SVG de ruido.

**Uso:** ir arriba de `body` para darle textura.

**Notas:** `pointer-events-none`, no bloquea interacciones.

---

### `components/ResponsiveGodRays.tsx`
**Qué es:** fondo animado de “rayos de luz” con shader.

**Depende de:**

- `useViewport()` → tamaño controlado por dispositivo
- `useIntersectionObserver()` → sólo renderiza cuando está visible
- `useLoading()` → espera a que termine la pantalla de carga

**Notas:**

- Llama `setAssetLoaded('god-rays-shader')`
- Usa `<AnimatePresence>` para fundir entrada/salida

---

### `components/ui/wavy-background.tsx` + `components/demo/WavyBackgroundDemo.tsx`
**Qué es:** canvas con ondas usando `simplex-noise`, blur y degradados.

**Props clave:**

- `colors?: string[]`
- `waveWidth?: number`
- `backgroundFill?: string`
- `speed?: "slow" | "fast"`
- `waveOpacity?: number`

**Demo:** muestra una frase de Steve Jobs.

---

### `components/ScrollTracker.tsx`
**Qué es:** barra superior que indica % de scroll.

**Uso:** docs largos, blogs.

---

### `components/TheEnd.tsx`
**Qué es:** sección final con texto “THE END” y confetti en hover.

**Notas:** ideal como bloque de cierre de landing.

---

## 3. 🧠 SEO / JSON-LD

### `components/SEO/builders.ts`
**Funciones:**

- `buildOrganization(...)`
- `buildWebsite(...)`
- `buildService(...)`
- `buildBreadcrumbs(baseUrl, items)`
- `buildFAQ(faqs)`

**Qué hacen:** devuelven objetos JSON-LD listos para inyectar.

---

### `components/SEO/JsonLd.tsx`
**Qué es:** componente cliente que inyecta `<Script type="application/ld+json">`.

**Props:**

- `data: object`
- `id: string`

**Uso:** `<JsonLd data={buildOrganization(...)} id="org" />`

---

## 4. 🧩 Secciones de página / marketing

### `components/SectionHeading.tsx`
**Qué es:** título + subtítulo centrados.

**Props:**

- `heading: string`
- `subheading?: string`
- `animationId?: string` → agrega `data-gsap="..."`

---

### `components/SecondQuote.tsx`
**Qué es:** bloque de cita con fondo SVG.

---

### `components/DownloadResumeCTA.tsx`
**Qué es:** CTA animada con Framer Motion para descargar `/L4.docx`.

**Notas:** el enlace es directo, cámbialo si cambia el CV.

---

### `components/ContactForm.tsx`
**Qué es:** formulario de contacto con inputs degradados.

**Notas:**

- Ahora mismo hace `preventDefault()`, no envía.
- Incluye select de tipo de proyecto y presupuesto.

---

### `components/Footer.tsx`
**Qué es:** footer con enlaces y redes.

**Notas:**

- Usa imágenes locales de logos.
- Año dinámico.

---

## 5. 🧱 Servicios, tarjetas y carrusel

### `components/data/servicesData.ts`
**Qué es:** dataset con todos los servicios (software, web, social, licencias).

**Incluye:**

- `title`, `tagline`, `icon`
- `bullets: { heading, items[] }[]`
- `tags`
- `links` (pueden abrir paquetes o ir a WhatsApp)
- `packages` (subtitle + plans)

---

### `components/Services.tsx`
**Qué es:** sección que muestra título y el carrusel.

**Usa:** `<ServicesCarousel services={servicesData} />`

---

### `components/ServiceCard.tsx`
**Qué es:** tarjeta que muestra un servicio.

**Props (interface Service):**

- `title`
- `tagline`
- `icon?: 'software' | 'web' | 'social' | 'licenses'`
- `bullets`
- `tags?`
- `links?`
- `packages?` → si existe y el link tiene `action: 'packages'`, abre modal

**Extras:**

- Trae función `handleCheckout` para Stripe que llama a `/api/checkout` (por si quieres pagar el servicio directo).

---

### `components/PackagesModal.tsx`
**Qué es:** modal Headless UI (Dialog + Transition) en 3 columnas.

**Props:**

- `open: boolean`
- `onClose: () => void`
- `title: string`
- `subtitle?: string`
- `plans: Array<{ name; price; highlights[]; cta? }>` (tipo `PackagePlan`)

---

### `components/ServicesCarousel.tsx`
**Qué es:** carrusel horizontal infinito de `ServiceCard`.

**Detalles:**

- Triplica el array: `[A B C | A B C | A B C]`
- Centra en el bloque del medio
- Normaliza al hacer scroll
- Flechas izq/der
- Accesible con teclado (`ArrowLeft`, `ArrowRight`)

---

## 6. 🎥 YouTube / Contenido social

### `components/ResponsiveYouTube.tsx`
**Qué es:** embed YouTube responsive y perezoso.

**Props:**

- `video` (id o url)
- `noCookie?`
- `start?`
- `autoplay?`
- `controls? = true`
- `lazy? = true`
- `allowFullScreen? = true`

**Comportamiento:**

- Muestra thumbnail
- Al click → pone el iframe real

---

### `components/youtube/CommentData.ts`
**Qué es:** dataset de comentarios.

**Campos:**

- `username`, `handle`, `avatarUrl`, `comment`, `isYouTuber`

**⚠️** Marcado como “componente extra”.

---

### `components/youtube/ScrollingTestimonials.tsx`
**Qué es:** 1 columna en mobile y 3 columnas en desktop con **marquee infinito**.

**Usa:**

- GSAP + ScrollTrigger (entrada)
- `TestimonialCard` interno

**⚠️** Marcado como “componente extra”.

---

### `components/youtube/YoutubeGrid.tsx`
**Qué es:** envuelve `ScrollingTestimonials` con `commentsData`.

**⚠️** Marcado como “componente extra”.

---

### `components/youtube/VideoGrid.tsx`
**Qué es:** grid de videos que hace `fetch('/api/youtube/videos')`.

**Estados:**

- loading → skeleton
- loaded → 3 columnas

**Anima** cada card con GSAP.

**⚠️** Marcado como “componente extra”.

---

### `components/youtube/YoutubeVideos.tsx`
**Qué es:** sección con heading + `VideoGrid` animado con Framer.

**⚠️** Marcado como “componente extra”.

---

## 7. 📈 Startups y métricas

### `components/mrr-card.tsx`
**Qué es:** tarjeta de MRR con Recharts.

**Props:**

- `name`
- `description`
- `mrr`
- `data: { month, mrr }[]`
- `iconName` (Zap, Cloud, Lock, Leaf, Heart, GraduationCap, Home, DollarSign)
- `status: 'success' | 'failed'`

**Notas:**

- Si es `failed`, baja la opacidad y usa rojo.
- Tooltip muestra MRR por mes.

---

### `components/Startup.tsx`
**Qué es:** sección que arma 2 grids:
1. Startups exitosas
2. Failed Startups

**Notas:** usa `MrrCard` para cada una.

---

## 8. 🕒 Timeline / Historia

### `components/TimelineComponent.tsx`
**Qué es:** timeline narrativo (2020 → 2025) con GSAP + ScrollTrigger.

**Contenido:** historia personal / relanzar proyecto.

---

### `components/ui/timeline.tsx`
**Qué es:** timeline genérico con Framer Motion.

**Props:**

- `data: { title: string; content: React.ReactNode }[]`

**Características:**

- Línea vertical
- Punto rojo por item
- Línea de progreso que crece con scroll (`useScroll`, `useTransform`)

---

## 9. 📝 Blog / MDX

### `components/mdx/MDXComponent.tsx`
**Qué es:** renderer de MDX en el cliente.

**Hace:**

- Evalúa `code` con `new Function`
- Inyecta componentes: `Callout`, `Youtube`, `SectionSeparator`, `Carousel`, overrides de `h1..h6`, tablas, imágenes
- Construye `TableOfContents` leyendo `h1` y `h2` del DOM
- Excluye del TOC: “Table of Contents”, “Blog Name” y el `title` del post

**Props:**

- `code: string`
- `title: string`

---

### `lib/markdownToHtml.ts`
**Qué es:** utilidad async que convierte Markdown → HTML.

**Stack:**

- `remark-parse`
- `remark-rehype`
- `rehype-pretty-code` (tema: `catppuccin-macchiato`)
- copy button (`transformerCopyButton`)
- `rehype-stringify`

---

### `lib/posts.ts` (lo que mandaste con `glob`)
**Qué es:** utilidades para leer `.mdx` del FS.

**Funciones:**

- `getPostSlugs()`
- `getPost(filepath)`
  - Calcula `readTime`
  - Escribe de vuelta al frontmatter si no estaba
  - Usa `.cache/readTimes.json`
- `getPosts(limit?)`
- `getPostBySlug(slug)`
- `getFeaturedPosts(limit = 8)`

**Notas:** pensado para correr en **server/build**.

---

## 10. ⏳ Loading global

### `lib/context/LoadingContext.tsx`
**Qué es:** contexto global de carga.

**Estado:**

- `progress`
- `isLoading`
- `isComplete`
- `loadedAssets: Set<string>`

**Métodos:**

- `setAssetLoaded(name)`
- `setProgress(n)`
- `setLoadingComplete()`

**Constante:**

- `REQUIRED_ASSETS = ['god-rays-shader', 'fonts', 'hero-components', 'critical-images']`

---

### `lib/hooks/useAssetPreloader.ts`
**Qué hace:**

- Simula progreso (hasta ~85%)
- Marca assets como cargados con `setAssetLoaded(...)`
- Tras mínimo de tiempo → `setProgress(100)`

---

### `components/LoadingManager.tsx`
**Qué es:** muestra `LoadingScreen` mientras no se termine.

---

### `components/LoadingScreen.tsx`
**Qué es:** pantalla negra con % gigante y barra inferior.

**Flujo:**

1. bloquea scroll
2. anima número con GSAP
3. anima barra
4. cuando `isComplete` → anima salida
5. dispara `window.dispatchEvent(new CustomEvent('loadingScreenComplete'))`

---

### `components/DebugNoticeModal.tsx`
**Qué es:** modal flotante de “versión demo”.

**Se muestra si:**

- `NODE_ENV === 'development'` **o**
- `NEXT_PUBLIC_SHOW_DEBUG_NOTICE === 'true'`
- y no está `sessionStorage['debugNoticeDismissedSession']`

---

## 11. 🧪 Hooks

### `lib/hooks/useIntersectionObserver.ts`
**Qué es:** hook que devuelve `{ ref, entry, isIntersecting }`.

**Params:**

- `threshold`
- `root`
- `rootMargin`
- `freezeOnceVisible?`

---

### `lib/hooks/useViewport.ts`
**Qué es:** hook que devuelve un tamaño “seguro” (390, 1024, 1920) según ancho.

**Uso:** shaders, canvas, efectos.

---

## 12. 🧰 Utilidades

### `lib/utils.ts` (último que enviaste)
**Funciones:**

- `cn(...)` → merge de clases (clsx + twMerge)
- `formatDate(...)`
- `sortPosts(...)`
- `getAllTags(...)`
- `sortTagsByCount(...)`
- `getPostsByTagSlug(...)`

---

## 13. 🌍 Integraciones externas

### Turnstile (Cloudflare)
**Qué es:** componente cliente que renderiza el widget.

**Lee:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

**Callbacks:** `onToken(token)`

---

### Stripe (simple)
**Qué es:** botón que hace `fetch('/api/checkout')` y redirige a la URL que vuelve.

**Props:** `priceId: string`

---

## 14. 🧪 Variables de entorno (ejemplo que pasaste)

```env
NEXT_PUBLIC_BASE_URL=https://l4zarus.dev

# Resend
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=...

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...

# Upstash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

NEXT_PUBLIC_SHOW_DEBUG_NOTICE=true

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
