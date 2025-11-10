import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { active } = await req.json();

    // Ruta al archivo .env
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Si existe la variable, reemplázala; si no, agrégala al final
    if (envContent.includes('MAINTENANCE_MODE=')) {
      envContent = envContent.replace(/MAINTENANCE_MODE=.*/, `MAINTENANCE_MODE=${active}`);
    } else {
      envContent += `\nMAINTENANCE_MODE=${active}`;
    }

    fs.writeFileSync(envPath, envContent);

    return NextResponse.json({ success: true, active });
  } catch (error) {
    console.error('Error al cambiar modo mantenimiento:', error);
    return NextResponse.json(
      { success: false, error: 'No se pudo actualizar el modo mantenimiento.' },
      { status: 500 }
    );
  }
}
