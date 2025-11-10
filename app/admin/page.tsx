'use client';

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [maintenance, setMaintenance] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Push state
  const [pushStatus, setPushStatus] = useState<'idle' | 'enabled' | 'denied' | 'subscribed' | 'error'>('idle');
  const [pushMsg, setPushMsg] = useState('');
  const [pushTitle, setPushTitle] = useState('🛠️ Aviso del sitio');
  const [pushBody, setPushBody] = useState('Este es un mensaje de prueba de notificaciones.');
  const [pushUrl, setPushUrl] = useState('/');

  // Cargar configuración actual
  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setMaintenance(!!data.maintenance);
        setNotification(data.notification || '');
      })
      .catch(() => setMessage('❌ Error al cargar configuración.'));
  }, []);

  // Guardar cambios (mantenimiento + banner web opcional)
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenance, notification }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Cambios guardados correctamente');
      } else {
        setMessage('⚠️ No se pudieron guardar los cambios');
      }
    } catch (err) {
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Notificaciones Push (WebPush)
  // ---------------------------

  // Helper para convertir la VAPID key
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = typeof window !== 'undefined' ? window.atob(base64) : '';
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }

  // Registrar SW, pedir permiso y suscribir dispositivo actual
  const enablePushOnThisDevice = async () => {
    setPushMsg('');
    try {
      if (!('serviceWorker' in navigator)) {
        setPushStatus('error');
        setPushMsg('El navegador no soporta Service Worker.');
        return;
      }
      if (!('PushManager' in window)) {
        setPushStatus('error');
        setPushMsg('El navegador no soporta Push API.');
        return;
      }

      // 1) registrar SW
      const swReg = await navigator.serviceWorker.register('/sw.js');
      // 2) pedir permiso
      const perm = await Notification.requestPermission();
      if (perm === 'denied') {
        setPushStatus('denied');
        setPushMsg('Permiso de notificaciones denegado.');
        return;
      }
      // 3) suscribir con VAPID
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setPushStatus('error');
        setPushMsg('Falta NEXT_PUBLIC_VAPID_PUBLIC_KEY en el .env');
        return;
      }
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      // 4) enviar al backend para guardar
      const saved = await fetch('/api/notify/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      if (!saved.ok) {
        setPushStatus('error');
        setPushMsg('No se pudo registrar la suscripción en el servidor.');
        return;
      }

      setPushStatus('subscribed');
      setPushMsg('✔️ Dispositivo suscrito a notificaciones.');
    } catch (e: any) {
      setPushStatus('error');
      setPushMsg(`Error al habilitar push: ${e?.message || e}`);
    }
  };

  // Enviar broadcast a todos los suscriptores guardados (desde el server)
  const sendBroadcast = async () => {
    setPushMsg('');
    try {
      const res = await fetch('/api/notify/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pushTitle,
          body: pushBody,
          url: pushUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setPushMsg('📣 Notificación enviada a los suscriptores.');
      } else {
        setPushMsg(`No se pudo enviar: ${data?.message || 'error'}`);
      }
    } catch (e: any) {
      setPushMsg(`Error al enviar: ${e?.message || e}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold gradient-text">Panel de Administración</h1>
      <p className="text-gray-400 mt-2">Control del sitio, mantenimiento y notificaciones push</p>

      <div className="mt-10 w-full max-w-2xl space-y-8">

        {/* Sección: Mantenimiento + Banner web */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Sitio</h2>

          <div className="flex items-center justify-between">
            <span>🔧 Modo mantenimiento</span>
            <button
              onClick={() => setMaintenance(!maintenance)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                maintenance ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
              }`}
            >
              {maintenance ? 'Desactivar' : 'Activar'}
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-2 text-gray-400">🪧 Notificación (banner en sitio)</label>
            <textarea
              value={notification}
              onChange={e => setNotification(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white"
              rows={3}
              placeholder="Mensaje que se mostrará en todo el sitio..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-6 w-full bg-red-600 hover:bg-red-500 py-3 rounded-full font-semibold transition"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>

          {message && <p className="text-sm text-gray-400 text-center mt-4">{message}</p>}
        </div>

        {/* Sección: Notificaciones push al dispositivo */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-xl font-semibold mb-4">🔔 Notificaciones Push (dispositivo)</h2>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <p className="text-sm text-white/80">
                Registra este navegador para recibir notificaciones push.
              </p>
              <p className="text-xs text-white/50 mt-1">
                Requiere permisos del navegador y un Service Worker en <code>/sw.js</code>.
              </p>
            </div>
            <button
              onClick={enablePushOnThisDevice}
              className="px-4 py-2 rounded-full font-semibold transition bg-white text-black hover:bg-transparent hover:text-white hover:shadow-alt-cta"
            >
              Habilitar en este dispositivo
            </button>
          </div>

          {pushMsg && (
            <p
              className={`mt-3 text-sm ${
                pushStatus === 'error' ? 'text-red-400' : 'text-gray-300'
              }`}
            >
              {pushMsg}
            </p>
          )}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-3">
              <label className="block text-sm mb-2 text-gray-400">Título</label>
              <input
                value={pushTitle}
                onChange={e => setPushTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white"
                placeholder="Título de la notificación"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm mb-2 text-gray-400">Mensaje</label>
              <textarea
                value={pushBody}
                onChange={e => setPushBody(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white"
                rows={3}
                placeholder="Contenido del push"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm mb-2 text-gray-400">URL (opcional)</label>
              <input
                value={pushUrl}
                onChange={e => setPushUrl(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white"
                placeholder="/ o https://tu-sitio.com/alguna-ruta"
              />
            </div>
          </div>

          <button
            onClick={sendBroadcast}
            className="mt-6 w-full bg-red-600 hover:bg-red-500 py-3 rounded-full font-semibold transition"
          >
            Enviar notificación a suscriptores
          </button>
        </div>
      </div>
    </div>
  );
}
