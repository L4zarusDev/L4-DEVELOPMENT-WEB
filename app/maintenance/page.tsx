'use client';

import { useEffect, useState } from 'react';

export default function MaintenancePage() {
  const [message, setMessage] = useState(
    'Estamos realizando mejoras. Volveremos pronto 🚀'
  );

  // Cargar notificación global desde la API (opcional)
  useEffect(() => {
    async function fetchNotice() {
      try {
        const res = await fetch('/api/admin/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data.notification) setMessage(data.notification);
      } catch {
        // usa el mensaje por defecto
      }
    }
    fetchNotice();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white text-center">
      {/* Fondo animado con gradiente */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#7a0a0a_0%,_#000_80%)] opacity-70 animate-pulse" />

      {/* Efecto de blur futurista */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Contenido */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
          🛠️ En mantenimiento
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {message}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 animate-gradient-x rounded-full"></div>
          <p className="text-sm text-gray-500">
            L4 DEVELOPMENT | Innovación en progreso
          </p>
        </div>
      </div>

      {/* Animación sutil del fondo */}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
