'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@{workspace}/ui';
import { api } from '@/app/api/client';

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { data: { greeting } = {} } = api.post.hello.useQuery({
    text: 'client',
  });

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName('');
    },
  });

  return (
    <>
      <p>Greeting: {greeting}</p>
      <form
        className="flex flex-col gap-2"
        onSubmit={e => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
        {createPost.isError && (
          <p className="text-red-500">{createPost.error.message}</p>
        )}
      </form>
    </>
  );
}
