import React, { CSSProperties, ReactNode } from 'react';

export type TMenuPosition = {
  top: number;
  left: number;
};

export interface IDropdownMenuProps {
  children: ReactNode;
  style?: CSSProperties;
  menuPosition: TMenuPosition;
}

export interface IMenuItemProps {
  text: string;
  iconPath: string;
  alt: string;
}

export interface IMoreButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}