// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-4 text-3xl font-bold">¡Pago exitoso! 🎉</h1>
      <p className="mb-6 text-gray-300">
        Gracias por tu compra. Recibirás un correo con los detalles.
      </p>
      {/* ✅ usar Link en lugar de <a /> */}
      <Link
        href="/"
        className="rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
