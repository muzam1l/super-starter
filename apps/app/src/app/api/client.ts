'use client';

import type { AppRouter } from '@/routers/root';
import { createTRPCReact } from '@trpc/react-query';
import { getClientProvider } from '@{workspace}/api/client';

export const api = createTRPCReact<AppRouter>();

export const Provider = getClientProvider(api);
