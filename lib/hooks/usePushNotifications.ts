'use client';
import { useEffect } from 'react';

export function usePushNotifications() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Notificaciones push no soportadas');
      return;
    }

    async function subscribe() {
      try {
        // Registrar el service worker
        const reg = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registrado ✅', reg);

        // Pedir permiso al usuario
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('Permiso de notificaciones denegado');
          return;
        }

        // Crear suscripción
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        // Enviar suscripción al backend
        await fetch('/api/notify/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sub.toJSON()),
        });
      } catch (error) {
        console.error('Error al suscribirse a notificaciones:', error);
      }
    }

    subscribe();
  }, []);
}
