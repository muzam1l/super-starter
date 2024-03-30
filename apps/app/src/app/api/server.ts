import 'server-only';

import { createCaller } from '@/routers/root';
import { createRSCContext } from '@{workspace}/api/trpc';

export const api = createCaller(createRSCContext);
