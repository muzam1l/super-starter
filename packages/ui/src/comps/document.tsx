import { cn } from '#lib/utils';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme/provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const Document: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased', inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
