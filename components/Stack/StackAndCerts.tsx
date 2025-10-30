'use client';

import { motion } from 'framer-motion';
// Si usas next/image, puedes reemplazar <img> por <Image> y agregar dominios en next.config.

// ─────────────────────────────────────────────────────────────
// Tipos base
// ─────────────────────────────────────────────────────────────
type StackItem = {
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  tag?: string; // p. ej. "Frontend", "DevOps"
  icon?: string; // ruta o URL absoluta de la tech
};

type StackGroup = {
  id: string;
  label: string;
  items: StackItem[];
};

type Cert = {
  title: string;
  issuer: string;
  date?: string; // "2025-09"
  id?: string; // código/ID
  verifyUrl?: string;
  logo?: string; // ruta /images/certs/*.svg|png
  skills?: string[];
};

// ─────────────────────────────────────────────────────────────
// Datos de stack (grupos)
// * Aquí es donde metes tus tecnologías reales
// * Puedes separar por categorías y mantener la UI
// ─────────────────────────────────────────────────────────────
const stack: StackGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      {
        name: 'Next.js',
        level: 'Experto',
        tag: 'SSR/ISR',
        icon: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
      },
      {
        name: 'React',
        level: 'Experto',
        tag: 'SPA/CSR',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png',
      },
      {
        name: 'TypeScript',
        level: 'Experto',
        tag: 'DX',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg',
      },
      {
        name: 'Tailwind CSS',
        level: 'Avanzado',
        tag: 'UI',
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png',
      },
      {
        name: 'Astro',
        level: 'Intermedio',
        tag: 'Islas',
        icon:
          'https://www.drupal.org/files/project-images/1_nLbfO_PdTSpeCdZQuUr8RQ.png',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      {
        name: 'Node.js',
        level: 'Experto',
        tag: 'Runtime',
        icon:
          'https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25090553/nodejs-inner.webp',
      },
      {
        name: 'NestJS',
        level: 'Avanzado',
        tag: 'APIs',
        icon: 'https://nestjs.com/img/logo-small.svg',
      },
      {
        name: 'Prisma',
        level: 'Avanzado',
        tag: 'ORM',
        icon:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2k4NxXc6q2ie-0W4csaBoXfgUpIpb65kExQ&s',
      },
      {
        name: 'PostgreSQL',
        level: 'Avanzado',
        tag: 'DB',
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1163px-Postgresql_elephant.svg.png',
      },
      {
        name: 'Redis',
        level: 'Intermedio',
        tag: 'Cache',
        icon: 'https://xitoring.com/wp-content/uploads/2023/03/redis.png',
      },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    items: [
      {
        name: 'AWS',
        level: 'Intermedio',
        tag: 'Infra',
        icon:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqAkI-uTuDVhXgAgPSSUlysUfaWn-Wud874Q&s',
      },
      {
        name: 'GCP',
        level: 'Intermedio',
        tag: 'Infra',
        icon:
          'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png?hl=es',
      },
      {
        name: 'Docker',
        level: 'Avanzado',
        tag: 'Contenedores',
        icon:
          'https://www.stackhero.io/assets/src/images/servicesLogos/openGraphVersions/docker.png?d87f4381',
      },
      {
        name: 'GitHub Actions',
        level: 'Avanzado',
        tag: 'CI/CD',
        icon:
          'https://me-dutour-mathieu.gallerycdn.vsassets.io/extensions/me-dutour-mathieu/vscode-github-actions/3.0.1/1596182639279/Microsoft.VisualStudio.Services.Icons.Default',
      },
      {
        name: 'Vercel',
        level: 'Experto',
        tag: 'Edge/Deploy',
        icon: 'https://karmanivero.us/assets/images/logo-vercel.png',
      },
    ],
  },
  {
    id: 'data-ai',
    label: 'Data & AI',
    items: [
      {
        name: 'OpenAI API',
        level: 'Avanzado',
        tag: 'LLMs',
        icon:
          'https://images.archbee.com/PL8X94efBsjvhfQV3wyyj-UUjn5uUTngOmDCOl0lrvW-20250814-103121.png?format=webp',
      },
      {
        name: 'RAG',
        level: 'Intermedio',
        tag: 'Search',
        icon: '/images/stack/rag.svg',
      },
      {
        name: 'Pinecone / Weaviate',
        level: 'Intermedio',
        tag: 'Vector DB',
        icon: 'https://avatars.githubusercontent.com/u/37794290?v=4',
      },
      {
        name: 'Python',
        level: 'Intermedio',
        tag: 'Data',
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Analytics',
    items: [
      {
        name: 'Meta Ads',
        level: 'Avanzado',
        tag: 'Paid',
        icon: 'https://nowmarketingdigital.com/wp-content/uploads/kgkg.webp',
      },
      {
        name: 'Google Ads',
        level: 'Intermedio',
        tag: 'Paid',
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/961px-Google_Ads_logo.svg.png',
      },
      {
        name: 'GA4',
        level: 'Avanzado',
        tag: 'Analytics',
        icon:
          'https://ppc.land/content/images/size/w2000/2024/02/Google-Analytics.webp',
      },
      {
        name: 'Tag Manager',
        level: 'Avanzado',
        tag: 'Tracking',
        icon:
          'https://extensions.vtexassets.com/arquivos/ids/156903/image-13911e9d546447fbbc053c8f3d37620c.jpg?v=637443260613970000',
      },
      {
        name: 'SEO Técnico',
        level: 'Avanzado',
        tag: 'Orgánico',
        icon: 'https://www.arimetrics.com/wp-content/uploads/2022/04/SEOtecnico.png',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Certificaciones de ejemplo para pintar un JSON-LD
// (esto le da contexto semántico a Google)
// ─────────────────────────────────────────────────────────────
const certs: Cert[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2025-08',
    id: 'AWS-CLF-XXXX',
    verifyUrl: 'https://aws.amazon.com/verification',
    logo: '/images/certs/aws.svg',
    skills: ['Cloud', 'Well-Architected', 'Security'],
  },
  {
    title: 'Meta Certified Media Buying Professional',
    issuer: 'Meta',
    date: '2025-07',
    id: 'META-MB-XXXX',
    verifyUrl: 'https://www.facebook.com/business/learn/certification',
    logo: '/images/certs/meta.svg',
    skills: ['Campaigns', 'Optimization', 'Attribution'],
  },
  {
    title: 'Google Analytics 4 Certification',
    issuer: 'Google',
    date: '2025-06',
    id: 'GA4-XXXX',
    verifyUrl: 'https://skillshop.exceedlms.com/student/path/18168',
    logo: '/images/certs/ga4.svg',
    skills: ['Measurement', 'Events', 'Reports'],
  },
  {
    title: 'Next.js Advanced Patterns',
    issuer: 'Vercel',
    date: '2025-05',
    id: 'VERCEL-NEXT-XXXX',
    verifyUrl: 'https://vercel.com/solutions/nextjs',
    logo: '/images/certs/vercel.svg',
    skills: ['App Router', 'Edge', 'Caching'],
  },
  {
    title: 'TypeScript Deep Dive',
    issuer: 'TypeScript Community',
    date: '2025-04',
    id: 'TS-DD-XXXX',
    verifyUrl: 'https://www.typescriptlang.org/',
    logo: '/images/certs/ts.svg',
    skills: ['Types', 'Generics', 'DX'],
  },
];

// ─────────────────────────────────────────────────────────────
// Clases utilitarias
// ─────────────────────────────────────────────────────────────
const hBadge =
  'inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-200';

const card =
  'relative rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-black/60 p-4 transition hover:border-red-500/30';

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────
export default function StackAndCerts() {
  // JSON-LD de ejemplo para que las certs puedan ser entendidas como credenciales
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: certs.map((c, i) => ({
      '@type': 'EducationalOccupationalCredential',
      position: i + 1,
      name: c.title,
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      url: c.verifyUrl,
      identifier: c.id,
      validFor: 'P24M', // 24 meses de validez (ejemplo)
      competencyRequired: c.skills?.join(', '),
    })),
  });

  return (
    <section id="stack" className="relative mx-auto mt-40 max-w-7xl px-4">
      {/* Glow de fondo sutil rojo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(185,28,28,0.18) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Heading */}
      <div className="text-center">
        <p className={hBadge}>Stacks</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Tecnología que uso
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Un stack moderno de desarrollo, cloud y growth.
        </p>
      </div>

      {/* Grilla de stacks por categoría */}
      <div className="mt-10 space-y-8">
        {stack.map((group) => (
          <div key={group.id}>
            {/* Título de grupo */}
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-xl font-semibold text-white">
                {group.label}
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-red-600/60 to-transparent" />
            </div>

            {/* Cards del grupo */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map((item) => (
                <motion.div
                  key={item.name}
                  className={card}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Glow decorativo al hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(800px 100px at 50% -10%, rgba(239,68,68,0.12), transparent)',
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-3">
                    {/* Icono / logo de la tech */}
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/60">
                      {item.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-white/60">
                          {item.name[0]}
                        </span>
                      )}
                    </div>

                    {/* Texto */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-base font-semibold text-white">
                          {item.name}
                        </p>
                        {item.tag && (
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      {item.level && (
                        <p className="text-sm text-white/60">
                          {item.level}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* JSON-LD para SEO (certificaciones / skills) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
    </section>
  );
}
