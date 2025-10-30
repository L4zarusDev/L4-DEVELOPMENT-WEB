/* ============================================================
   🧩 COMPONENTE EXTRA
   "Startup" — grid de proyectos/startups con MRR de ejemplo
   ------------------------------------------------------------
   - Muestra una lista de startups (mock/dummy).
   - Separa las exitosas de las que fallaron.
   - Cada startup se renderiza con <MrrCard /> (tu componente).
   - Sirve perfecto para un portfolio tipo "cosas que he lanzado".
   - Puedes enchufar aquí datos reales desde tu API/DB en el futuro.
   ============================================================ */

import React from 'react';
import SectionHeading from '../SectionHeading';
import { MrrCard } from '../mrr-card';

// ===================================================================
// 1. Datos de ejemplo
//    - Aquí tienes un array de startups con MRR mes a mes
//    - "status" te permite separar las que "salieron" vs las que "murieron"
//    - Comentario: los MRR son totalmente inventados, cambia por los tuyos
// ===================================================================
const startupData = [
  {
    name: 'AIGenius',
    description: 'Revolutionizing AI for startups',
    mrr: 57_600,
    iconName: 'Zap',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 10_000 },
      { month: 'Sep', mrr: 15_000 },
      { month: 'Oct', mrr: 20_000 },
      { month: 'Nov', mrr: 25_000 },
      { month: 'Dec', mrr: 35_000 },
      { month: 'Jan', mrr: 40_000 },
      { month: 'Feb', mrr: 80_000 },
      { month: 'Mar', mrr: 120_000 },
      { month: 'Apr', mrr: 140_000 },
      { month: 'May', mrr: 100_000 },
      { month: 'Jun', mrr: 80_000 },
      { month: 'Jul', mrr: 57_600 },
    ],
  },
  {
    name: 'CloudScale',
    description: 'Elastic cloud infrastructure solutions',
    mrr: 89_000,
    iconName: 'Cloud',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 20_000 },
      { month: 'Sep', mrr: 25_000 },
      { month: 'Oct', mrr: 30_000 },
      { month: 'Nov', mrr: 40_000 },
      { month: 'Dec', mrr: 50_000 },
      { month: 'Jan', mrr: 60_000 },
      { month: 'Feb', mrr: 70_000 },
      { month: 'Mar', mrr: 75_000 },
      { month: 'Apr', mrr: 80_000 },
      { month: 'May', mrr: 85_000 },
      { month: 'Jun', mrr: 87_000 },
      { month: 'Jul', mrr: 89_000 },
    ],
  },
  {
    name: 'CryptoSafe',
    description: 'Secure cryptocurrency wallet and exchange',
    mrr: 120_000,
    iconName: 'Lock',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 30_000 },
      { month: 'Sep', mrr: 40_000 },
      { month: 'Oct', mrr: 50_000 },
      { month: 'Nov', mrr: 60_000 },
      { month: 'Dec', mrr: 70_000 },
      { month: 'Jan', mrr: 80_000 },
      { month: 'Feb', mrr: 90_000 },
      { month: 'Mar', mrr: 100_000 },
      { month: 'Apr', mrr: 110_000 },
      { month: 'May', mrr: 115_000 },
      { month: 'Jun', mrr: 118_000 },
      { month: 'Jul', mrr: 120_000 },
    ],
  },
  {
    name: 'EcoTrack',
    description: 'IoT-based environmental monitoring',
    mrr: 75_000,
    iconName: 'Leaf',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 15_000 },
      { month: 'Sep', mrr: 20_000 },
      { month: 'Oct', mrr: 25_000 },
      { month: 'Nov', mrr: 30_000 },
      { month: 'Dec', mrr: 35_000 },
      { month: 'Jan', mrr: 45_000 },
      { month: 'Feb', mrr: 55_000 },
      { month: 'Mar', mrr: 60_000 },
      { month: 'Apr', mrr: 65_000 },
      { month: 'May', mrr: 70_000 },
      { month: 'Jun', mrr: 73_000 },
      { month: 'Jul', mrr: 75_000 },
    ],
  },
  {
    name: 'HealthHub',
    description: 'AI-powered telemedicine platform',
    mrr: 95_000,
    iconName: 'Heart',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 25_000 },
      { month: 'Sep', mrr: 30_000 },
      { month: 'Oct', mrr: 40_000 },
      { month: 'Nov', mrr: 50_000 },
      { month: 'Dec', mrr: 60_000 },
      { month: 'Jan', mrr: 70_000 },
      { month: 'Feb', mrr: 75_000 },
      { month: 'Mar', mrr: 80_000 },
      { month: 'Apr', mrr: 85_000 },
      { month: 'May', mrr: 90_000 },
      { month: 'Jun', mrr: 93_000 },
      { month: 'Jul', mrr: 95_000 },
    ],
  },
  {
    name: 'EduTech',
    description: 'Personalized online learning experiences',
    mrr: 40_000,
    iconName: 'GraduationCap',
    status: 'failed',
    data: [
      { month: 'Aug', mrr: 0 },
      { month: 'Sep', mrr: 1_000 },
      { month: 'Oct', mrr: 2_000 },
      { month: 'Nov', mrr: 3_000 },
      { month: 'Dec', mrr: 2_500 },
      { month: 'Jan', mrr: 2_000 },
      { month: 'Feb', mrr: 1_500 },
      { month: 'Mar', mrr: 1_000 },
      { month: 'Apr', mrr: 500 },
      { month: 'May', mrr: 250 },
      { month: 'Jun', mrr: 100 },
      { month: 'Jul', mrr: 0 },
    ],
  },
  {
    name: 'SmartHome',
    description: 'Integrated smart home automation',
    mrr: 82_000,
    iconName: 'Home',
    status: 'success',
    data: [
      { month: 'Aug', mrr: 20_000 },
      { month: 'Sep', mrr: 25_000 },
      { month: 'Oct', mrr: 30_000 },
      { month: 'Nov', mrr: 40_000 },
      { month: 'Dec', mrr: 50_000 },
      { month: 'Jan', mrr: 60_000 },
      { month: 'Feb', mrr: 65_000 },
      { month: 'Mar', mrr: 70_000 },
      { month: 'Apr', mrr: 75_000 },
      { month: 'May', mrr: 78_000 },
      { month: 'Jun', mrr: 80_000 },
      { month: 'Jul', mrr: 82_000 },
    ],
  },
  {
    name: 'FintechFlow',
    description: 'Streamlined financial management for SMEs',
    mrr: 70_000,
    iconName: 'DollarSign',
    status: 'failed',
    data: [
      { month: 'Aug', mrr: 0 },
      { month: 'Sep', mrr: 10_000 },
      { month: 'Oct', mrr: 25_000 },
      { month: 'Nov', mrr: 50_000 },
      { month: 'Dec', mrr: 80_000 },
      { month: 'Jan', mrr: 100_000 },
      { month: 'Feb', mrr: 90_000 },
      { month: 'Mar', mrr: 70_000 },
      { month: 'Apr', mrr: 50_000 },
      { month: 'May', mrr: 30_000 },
      { month: 'Jun', mrr: 10_000 },
      { month: 'Jul', mrr: 0 },
    ],
  },
];

// ===================================================================
// 2. Componente
//    - Filtra las exitosas y las fallidas
//    - Pinta primero las exitosas con un grid más "hero"
//    - Luego muestra las que fallaron con un H2 rojo
// ===================================================================
export default function Startup() {
  // Separamos por status
  const successfulStartups = startupData.filter(
    (startup) => startup.status === 'success',
  );
  const failedStartups = startupData.filter(
    (startup) => startup.status === 'failed',
  );

  return (
    <div id="projects" className="mt-20 px-6 lg:mt-40 lg:px-3">
      {/* Título + subtítulo de sección */}
      <SectionHeading
        heading="Projects & Startups (demo)"
        subheading="Live Streaming weekly: AI Startups until 💰, Fail Fast, Fail often, Fail Forward"
      />

      {/* Grid de proyectos exitosos */}
      <div className="3xl:max-w-[1440px] mx-auto grid max-w-[83rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-[1100px]">
        {successfulStartups.map((startup, index) => (
          <div
            key={startup.name}
            className={
              // un poco de variación en el layout para que no sea tan plano
              index === 1 || index === 2 || index === 5
                ? 'sm:col-span-2'
                : 'sm:col-span-1'
            }
          >
            <MrrCard
              name={startup.name}
              description={startup.description}
              mrr={startup.mrr}
              data={startup.data}
              iconName={startup.iconName}
              status={startup.status as 'success' | 'failed'}
            />
          </div>
        ))}
      </div>

      {/* Grid de proyectos que fallaron (opcional) */}
      {failedStartups.length > 0 && (
        <>
          <h2 className="mb-6 mt-12 text-center text-2xl font-bold text-red-500">
            Failed Startups
          </h2>
          <div className="3xl:max-w-[1440px] mx-auto grid max-w-[83rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-[1100px]">
            {failedStartups.map((startup, index) => (
              <div
                key={startup.name}
                className={
                  // Variamos de nuevo para no dejarlo cuadrado
                  index % 6 === 0 || index % 6 === 3
                    ? 'md:col-span-2'
                    : 'md:col-span-1'
                }
              >
                <MrrCard
                  name={startup.name}
                  description={startup.description}
                  mrr={startup.mrr}
                  data={startup.data}
                  iconName={startup.iconName}
                  status={startup.status as 'success' | 'failed'}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
