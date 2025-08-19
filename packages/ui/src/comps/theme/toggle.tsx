'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '#comps/button';
import { Dropdown } from '../dropdown';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Dropdown
      items={[
        { label: 'Light', onClick: () => setTheme('light') },
        { label: 'Dark', onClick: () => setTheme('dark') },
        { label: 'System', onClick: () => setTheme('system') },
      ]}
    >
      <Button variant="ghost" size="sm">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Dropdown>
  );
}
