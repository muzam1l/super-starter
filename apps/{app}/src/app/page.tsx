import Link from 'next/link';

import { CreatePost } from '@/app/comps/create-post';
import { Button } from '@{workspace}/ui';
import { Suspense } from 'react';
import { api, HydrateClient } from '@/app/api/trpc/server';
import { auth } from '@{workspace}/auth';
import { PrefetchedGreeting } from './comps/prefetched-greeting';

export default async function Home() {
  performance.mark('h');
  api.post.hello.prefetch({ text: 'from hydrated tRPC ' });
  const { greeting } = await api.post.hello({ text: 'from server tRPC' });
  console.log(performance.measure('h1', 'h'));

  return (
    <div className="flex flex-col items-start gap-4 p-2">
      {greeting}
      <HydrateClient>
        <PrefetchedGreeting />
      </HydrateClient>
      <Suspense fallback="Loading auth info...">
        <AuthShowcase />
      </Suspense>
    </div>
  );
}
async function AuthShowcase() {
  performance.mark('1');
  const session = await auth();
  console.log('session1', performance.measure('m1', '1'));

  return (
    <>
      <p>{session && <span>Logged in as {session.user?.name}</span>}</p>

      <Button variant="destructive">
        <Link className="block" href={session ? '/api/auth/signout' : '/api/auth/signin'}>
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
  const session = await auth();
  console.log('session1', performance.measure('m2', '2'));
  if (!session?.user) {
    return null;
  }

  const secret = await api.post.getSecretMessage();
  const latestPost = await api.post.getLatest();
  return (
    <>
      <p>Secret: {secret}</p>

      {latestPost ? <p>Most recent post: {latestPost.name}</p> : <p>No posts yet.</p>}

      <CreatePost />
    </>
  );
}
