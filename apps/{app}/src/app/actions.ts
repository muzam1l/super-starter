'use server';

import { api } from './api/trpc/server';

export const hello = async (text: string) => api.hello.sayHelloPublic(text);
