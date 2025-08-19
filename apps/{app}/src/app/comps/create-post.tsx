'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@{workspace}/ui/comps/button';
import { api } from '@/app/api/trpc/client';
import { hello } from '../api/trpc/actions';

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { isPending, error, mutate } = api.post.create.useMutation({
    onSuccess: async () => {
      alert((await hello('You did it!')).greeting);
      router.refresh();
      setName('');
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        mutate({ name });
      }}
    >
      <input type="text" placeholder="Title" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
