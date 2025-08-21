'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/sign-in');
  }, [router]);

  return <div>Error</div>;
}
