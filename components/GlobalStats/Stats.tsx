/**
 * ============================================================
 * 🧩 COMPONENTE EXTRA
 * ------------------------------------------------------------
 * Stats (server component)
 * - Obtiene métricas de YouTube (views, subs) y GitHub (stars)
 * - Usa `react.cache` para no pedir los datos en cada request
 * - En desarrollo (`NODE_ENV=development`) usa datos mock
 * - Entrega los datos a un cliente (`StatsClient`) para mostrarlos
 * ============================================================
 */

import { google } from 'googleapis';
import { Octokit } from '@octokit/rest';
import { cache } from 'react';
import StatsClient from './StatsClient';

// Tipo base de cada métrica
interface Stat {
  value: number;
  label: string;
}

// Flag para usar datos falsos en local
const DEBUG = process.env.NODE_ENV === 'development';

/**
 * getCachedChannelInfo
 * ------------------------------------------------------------
 * - Llama a la API de YouTube para traer estadísticas de un canal
 * - Se envuelve en `cache(...)` para que Next lo memorice
 * - Si está en DEBUG, regresa datos de prueba
 */
const getCachedChannelInfo = cache(
  async (channelId: string): Promise<Stat[]> => {
    // Datos fake para desarrollo (evita golpear la API)
    if (DEBUG) {
      return [
        { value: 10_000_000, label: 'Youtube Views' },
        { value: 100_000, label: 'Youtube Subscribers' },
      ];
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    try {
      const response = await youtube.channels.list({
        part: ['statistics'],
        id: [channelId],
      });

      if (response.data.items && response.data.items.length > 0) {
        const channel = response.data.items[0];
        return [
          {
            value: Number(channel.statistics?.viewCount) || 0,
            label: 'Youtube Views',
          },
          {
            value: Number(channel.statistics?.subscriberCount) || 0,
            label: 'Youtube Subscribers',
          },
        ];
      }

      // Si no hay canal, devolvemos array vacío
      console.log('Channel not found');
      return [];
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return [];
    }
  },
);

/**
 * getCachedGitHubStars
 * ------------------------------------------------------------
 * - Llama a la API de GitHub y suma los stars de TODOS los repos públicos
 * - Cacheado para no pasarnos del rate limit
 * - En DEBUG regresa un número fijo
 */
const getCachedGitHubStars = cache(
  async (username: string): Promise<number> => {
    if (DEBUG) {
      return 528;
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
    });

    try {
      const { data: repos } = await octokit.repos.listForUser({
        username,
        per_page: 100, // sube esto si tienes más repos
      });

      const totalStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0,
      );

      return totalStars;
    } catch (error) {
      console.error('Error fetching GitHub stars:', error);
      return 0;
    }
  },
);

/**
 * Stats (server component)
 * ------------------------------------------------------------
 * - Resuelve las dos promesas en paralelo
 * - Construye el array final de stats
 * - Lo pasa al componente cliente para renderizar
 */
export const Stats = async () => {
  const YOUR_CHANNEL_ID = 'UCkwRYP1J1hjRXwo5lyBRWdQ';
  const YOUR_GITHUB_USERNAME = 'L4zarusDev';

  let youtubeStats: Stat[] = [];
  let githubStars = 0;

  try {
    // Pedimos YouTube + GitHub en paralelo
    [youtubeStats, githubStars] = await Promise.all([
      getCachedChannelInfo(YOUR_CHANNEL_ID),
      getCachedGitHubStars(YOUR_GITHUB_USERNAME),
    ]);
  } catch (error) {
    console.error('Error fetching stats:', error);

    // Fallback por si una API falla
    youtubeStats = [
      { value: 0, label: 'Youtube Views' },
      { value: 0, label: 'Youtube Subscribers' },
    ];
    githubStars = 0;
  }

  // Mezclamos todas las métricas
  const statsData: Stat[] = [
    ...youtubeStats,
    { value: githubStars, label: 'Github Stars' },
  ];

  // El render real se hace en el cliente (animaciones, etc.)
  return <StatsClient statsData={statsData} isDebug={DEBUG} />;
};

export default Stats;
