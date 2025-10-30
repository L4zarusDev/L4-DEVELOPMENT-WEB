'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Zap,
  Cloud,
  Lock,
  Leaf,
  Heart,
  GraduationCap,
  Home,
  DollarSign,
} from 'lucide-react';

/* -----------------------------------------------------------------------------
   Tipos
   -------------------------------------------------------------------------- */
interface MrrCardProps {
  /** Nombre del proyecto/startup */
  name: string;
  /** Breve descripción que aparece debajo del título */
  description: string;
  /** MRR actual en número entero (ej. 57600 = 57,600 USD) */
  mrr: number;
  /** Serie temporal mensual para graficar */
  data: Array<{ month: string; mrr: number }>;
  /** Nombre del ícono a mostrar (debe existir en iconMap) */
  iconName: string;
  /** Estado de la startup: éxito o fallida */
  status: 'success' | 'failed';
}

/* -----------------------------------------------------------------------------
   Mapeo de nombres → íconos de lucide-react
   -------------------------------------------------------------------------- */
const iconMap = {
  Zap,
  Cloud,
  Lock,
  Leaf,
  Heart,
  GraduationCap,
  Home,
  DollarSign,
};

/**
 * MrrCard
 *
 * Tarjeta para mostrar el MRR de una startup con:
 * - encabezado (nombre, descripción, ícono)
 * - badge con estado (success/failed)
 * - línea de tiempo del MRR con recharts
 *
 * Si la startup está fallida (`status === "failed"`), la tarjeta
 * se ve más tenue y el color de línea es rojo.
 */
export function MrrCard({
  name,
  description,
  mrr,
  data,
  iconName,
  status,
}: MrrCardProps) {
  // si no existe el ícono que pasaste, usa Zap por defecto
  const Icon = iconMap[iconName as keyof typeof iconMap] ?? Zap;

  const isFailed = status === 'failed';

  return (
    <Card
      className={[
        'h-full w-full max-w-3xl text-white',
        // fondo base morado translúcido
        'bg-purple-900/20',
        // si falló, tintamos en rojo y bajamos opacidad
        isFailed ? 'bg-red-900/20 opacity-50' : '',
      ].join(' ')}
    >
      {/* HEADER ------------------------------------------------------------- */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div>
            <CardTitle className="flex items-center text-lg font-bold sm:text-2xl">
              {name}
              <Icon
                className={[
                  'ml-2 h-5 w-5 sm:h-6 sm:w-6',
                  isFailed ? 'text-red-400' : 'text-purple-400',
                ].join(' ')}
              />
            </CardTitle>
            <p className="text-xs text-gray-400 sm:text-sm">{description}</p>
          </div>
        </div>

        {/* Badge de estado / MRR actual ------------------------------------ */}
        <Badge
          variant={isFailed ? 'destructive' : 'secondary'}
          className={[
            'text-xs sm:text-sm',
            isFailed
              ? 'bg-red-900 text-red-200'
              : 'bg-purple-900 text-purple-200',
          ].join(' ')}
        >
          {isFailed ? 'Failed' : `MRR $${(mrr / 1000).toFixed(1)}k/mo`}
        </Badge>
      </CardHeader>

      {/* BODY (gráfica) ----------------------------------------------------- */}
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              {/* Eje X con los meses */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                stroke="#9CA3AF"
                tick={{ fontSize: 10 }}
                height={30}
              />

              {/* Eje Y con formato en miles */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
                stroke="#9CA3AF"
                tick={{ fontSize: 10 }}
                width={40}
              />

              {/* Tooltip flotante */}
              <Tooltip
                formatter={(value) => [`$${value}`, 'MRR']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  fontSize: '12px',
                }}
              />

              {/* Línea principal del MRR */}
              <Line
                type="monotone"
                dataKey="mrr"
                stroke={isFailed ? '#EF4444' : '#8B5CF6'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
