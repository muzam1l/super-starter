import Link from 'next/link';

import { CreatePost } from '@/app/comps/create-post';
import { Button } from '@{workspace}/ui/comps/button';
import { Suspense } from 'react';
import { api, HydrateClient } from '@/app/api/trpc/server';
import { PrefetchedGreeting } from './comps/client-greeting';
import { ThemeToggle } from '@{workspace}/ui/comps/theme/toggle';
import { getNextAuthSession } from '@{workspace}/api/auth';

export const dynamic = 'force-dynamic';

export default function Home() {
  performance.mark('h1');
  void api.hello.sayHelloPublic.prefetch('from hydrated tRPC');
  console.log(performance.measure('h1', 'h1'));

  return (
    <div className="flex flex-col items-start gap-4 p-2">
      <ServerGreeting />
      <HydrateClient>
        <Suspense fallback="Loading prefetched greeting...">
          <PrefetchedGreeting />
        </Suspense>
      </HydrateClient>
      <ThemeToggle />
      <Suspense fallback="Loading auth info...">
        <AuthShowcase />
      </Suspense>
    </div>
  );
}
const ServerGreeting = async () => {
  performance.mark('h2');
  const greeting = await api.hello.sayHelloPublic('from server tRPC');
  console.log(performance.measure('h2', 'h2'));
  return <p>{greeting}</p>;
};

async function AuthShowcase() {
  performance.mark('1');
  const session = await getNextAuthSession();
  console.log('session1', performance.measure('m1', '1'));

  return (
    <>
      <p>{session && <span>Logged in as {session.user.name}</span>}</p>

      <Button variant="destructive">
        <Link className="block" href={session ? '/auth/sign-out' : '/auth/sign-in'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </Button>

      <Suspense fallback="Loading posts info...">
        <CrudShowcase />
      </Suspense>
    </>
  );
}

async function CrudShowcase() {
  performance.mark('2');
  const session = await getNextAuthSession();
  console.log('session2', performance.measure('m2', '2'));
  if (!session?.user) {
    return null;
  }

  const secret = await api.post.getSecretMessage();
  const latestPost = await api.post.getLatest();
  return (
    <>
      <p>Secret: {secret}</p>

      {latestPost ? <p>Most recent post: {latestPost.title}</p> : <p>No posts yet.</p>}

      <CreatePost />
    </>
  );
}
