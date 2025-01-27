'use server';

import { api } from './server';

export const hello = async (text: string) => api.post.hello({ text });
