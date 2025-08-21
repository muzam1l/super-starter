'use client';

import { authClient } from '@{workspace}/api/client/auth';
import { Button } from '@{workspace}/ui/comps/button';
import { Card, CardContent, CardHeader, CardTitle } from '@{workspace}/ui/comps/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full m-2">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Are you sure you want to sign out?</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            className="w-full"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              void authClient
                .signOut()
                .then(() => {
                  router.push('/');
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
