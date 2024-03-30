import { cn } from '../utils';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const Document: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen font-sans antialiased', inter.variable)}
      >
        {children}
      </body>
    </html>
  );
};
