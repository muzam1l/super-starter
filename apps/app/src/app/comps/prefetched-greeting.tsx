'use client';

import { api } from '@/app/api/trpc/client';

export function PrefetchedGreeting() {
  const { data: { greeting } = {} } = api.post.hello.useQuery({
    text: 'from tRPC',
  });

  return <p>{greeting}</p>;
}
