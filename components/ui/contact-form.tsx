'use client';

/*
  ───────────────────────────────────────────────────────────
  ContactForm
  ----------------------------------------------------------------
  - Formulario de contacto enfocado a proyectos de IA / startups.
  - No hace submit real (onSubmit previene por defecto).
  - Inputs con bordes “neón” usando un wrapper con gradiente.
  - Pensado para integrarlo después con tu API / servicio (Formspree,
    /api/contact, Resend, etc.).
  - Adapta los <select> a tus propios tipos de proyecto y rangos de presupuesto.
  ───────────────────────────────────────────────────────────
*/

import { Button } from '@/components/ui/button';

export default function ContactForm() {
  // 👉 aquí puedes manejar el submit real:
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   // ...fetch('/api/contact', { method: 'POST', body: JSON.stringify(...) })
  // };

  return (
    <section id="contact-me" className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 text-neutral-300 md:px-8">
        {/* Encabezado */}
        <div className="mt-20">
          <div className="mx-auto max-w-lg space-y-3 sm:text-center">
            <h3 className="font-semibold text-indigo-600">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="text-3xl font-semibold text-neutral-100 sm:text-4xl">
              Ready to leverage AI?
            </p>
            <p>
              Looking to build AI-powered applications, integrate intelligent
              features, or launch your next startup? Let&apos;s discuss how we
              can bring your vision to life.
            </p>
          </div>

          {/* Formulario */}
          <div className="mx-auto mt-12 max-w-lg">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              {/* Nombre completo */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-100 outline-none placeholder-neutral-400/70 focus:border-white/80"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-100 outline-none placeholder-neutral-400/70 focus:border-white/80"
                  />
                </div>
              </div>

              {/* Tipo de consulta */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <select
                    required
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-400/70 outline-none focus:border-white/80 focus:text-neutral-100"
                  >
                    <option value="" disabled>
                      Type of Inquiry
                    </option>
                    <option value="ai-integration" className="text-neutral-100">
                      AI Integration Project
                    </option>
                    <option value="startup-mvp" className="text-neutral-100">
                      Startup MVP Development
                    </option>
                    <option value="ai-consulting" className="text-neutral-100">
                      AI Strategy Consulting
                    </option>
                    <option value="full-time" className="text-neutral-100">
                      Full-time AI Engineering Role
                    </option>
                    <option value="contract" className="text-neutral-100">
                      Contract AI Development
                    </option>
                    <option value="mentorship" className="text-neutral-100">
                      Startup Mentorship
                    </option>
                    <option value="collaboration" className="text-neutral-100">
                      Tech Partnership
                    </option>
                    <option value="other" className="text-neutral-100">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Empresa (opcional) */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <input
                    type="text"
                    placeholder="Company/Organization (optional)"
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-100 outline-none placeholder-neutral-400/70 focus:border-white/80"
                  />
                </div>
              </div>

              {/* Teléfono (opcional) */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-100 outline-none placeholder-neutral-400/70 focus:border-white/80"
                  />
                </div>
              </div>

              {/* Presupuesto (opcional) */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <select
                    className="w-full rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-400/70 outline-none focus:border-white/80 focus:text-neutral-100"
                  >
                    <option value="" disabled>
                      Project Budget (optional)
                    </option>
                    <option value="under-5k" className="text-neutral-100">
                      Under $5,000
                    </option>
                    <option value="5k-10k" className="text-neutral-100">
                      $5,000 - $10,000
                    </option>
                    <option value="10k-25k" className="text-neutral-100">
                      $10,000 - $25,000
                    </option>
                    <option value="25k-50k" className="text-neutral-100">
                      $25,000 - $50,000
                    </option>
                    <option value="50k-100k" className="text-neutral-100">
                      $50,000 - $100,000
                    </option>
                    <option value="over-100k" className="text-neutral-100">
                      $100,000+
                    </option>
                    <option value="discuss" className="text-neutral-100">
                      Let&apos;s discuss
                    </option>
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 via-yellow-500 to-blue-500 p-[2px]">
                  <textarea
                    required
                    placeholder="Describe your AI project or startup idea: What problem are you solving? Do you need AI integration, LLM implementation, RAG systems, or full-stack development? Include your timeline, tech stack preferences (TypeScript/Python), and any specific AI technologies you're considering. The more details you share, the better I can help bring your vision to life."
                    className="h-40 w-full resize-none appearance-none rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-900/90 via-neutral-900/90 to-blue-900/90 px-3 py-2 text-neutral-100 outline-none placeholder-neutral-400/70 focus:border-white/80"
                  />
                </div>
              </div>

              {/* Botón de envío */}
              <Button type="submit" className="w-full">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
