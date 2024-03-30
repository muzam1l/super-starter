import type { PropsWithChildren } from 'react';
import { Document } from '@{workspace}/ui';

import '@{workspace}/ui/globals.css';
import { Provider } from '@/app/api/client';

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <Document>
      <Provider>{children}</Provider>
    </Document>
  );
}