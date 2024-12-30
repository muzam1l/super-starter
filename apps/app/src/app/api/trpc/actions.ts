'use server';

import { api } from './server';

export const hello = (text: string) => api.post.hello({ text });
