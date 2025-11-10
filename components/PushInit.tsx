'use client';

import { usePushNotifications } from '@/lib/hooks/usePushNotifications';

export default function PushInit() {
  usePushNotifications();
  return null; // no renderiza nada en pantalla
}
