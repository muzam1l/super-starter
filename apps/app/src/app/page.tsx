import Link from 'next/link';

import { CreatePost } from '@/app/comps/create-post';
import { Button } from '@{workspace}/ui';
import { Suspense } from 'react';
import { api } from '@/app/api/server';
import { getAuthSession } from '@{workspace}/auth';

export default async function Home() {
  console.time('Home');
  const { greeting } = await api.post.hello({ text: 'from tRPC' });
  console.timeEnd('Home');

  return (
    <>
      <div className="flex flex-col items-start gap-4 p-2">
        <h1>{greeting}</h1>

        <Suspense fallback="Loading auth info...">
          <AuthShowcase />
        </Suspense>
      </div>
    </>
  );
}
async function AuthShowcase() {
  console.time('AuthShowcase');
  const session = await getAuthSession();
  console.timeEnd('AuthShowcase');

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
  console.time('CrudShowcase');

  const session = await getAuthSession();
  if (!session?.user) {
    console.timeEnd('CrudShowcase');
    return null;
  }

  const secret = await api.post.getSecretMessage();
  const latestPost = await api.post.getLatest();

  console.timeEnd('CrudShowcase');
  return (
    <>
      <p>Secret: {secret}</p>

      {latestPost ? <p>Most recent post: {latestPost.name}</p> : <p>No posts yet.</p>}

      <CreatePost />
    </>
  );
}
