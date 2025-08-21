'use client';

import { api } from '@/app/api/trpc/client';

export function PrefetchedGreeting() {
  const [data] = api.hello.sayHelloPublic.useSuspenseQuery('from hydrated tRPC');

  return <p>{data}</p>;
}
