'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NotificationBar() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchNotification() {
      try {
        const res = await fetch('/api/admin/settings', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.notification) setMessage(data.notification);
      } catch (err) {
        console.error('Error al cargar notificación:', err);
      }
    }
    fetchNotification();
    const interval = setInterval(fetchNotification, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!message) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-[9999] overflow-hidden"
    >
      <div className="relative flex justify-center items-center py-3 backdrop-blur-md bg-black/70 border-b border-red-700/40 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
        {/* Capa de gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-black animate-gradient-x opacity-40" />
        
        {/* Mensaje */}
        <p className="relative z-10 text-sm sm:text-base font-semibold tracking-wide text-white drop-shadow-md px-6">
          {message}
        </p>
      </div>
    </motion.div>
  );
}
