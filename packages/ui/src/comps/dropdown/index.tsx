'use client';

import type { FC, PropsWithChildren } from 'react';

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './primitive';

interface DropdownProps extends React.ComponentProps<typeof DropdownMenuRoot> {
  items: {
    label: string;
    key?: string;
    onClick: () => void;
  }[];
}

export const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({ children, items, ...props }) => {
  return (
    <DropdownMenuRoot {...props}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map(({ label, key, onClick }) => (
          <DropdownMenuItem key={key ?? label} onClick={onClick}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
