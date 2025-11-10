'use client';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuthorized(true);
    } else {
      alert('Contraseña incorrecta.');
    }
  };

  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl mb-4 font-bold gradient-text">Acceso restringido</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-neutral-900 border border-white/20 mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 font-semibold"
        >
          Entrar
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
