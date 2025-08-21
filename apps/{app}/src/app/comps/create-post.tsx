'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@{workspace}/ui/comps/button';
import { api } from '@/app/api/trpc/client';
import { hello } from '../actions';

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const { isPending, error, mutate } = api.post.create.useMutation({
    onSuccess: async () => {
      alert(await hello('Message from server action:You did it!'));
      router.refresh();
      setTitle('');
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        mutate({ title });
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
