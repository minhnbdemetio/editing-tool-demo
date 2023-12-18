import { FC } from 'react';
import { IconButton } from '../atoms/IconButton';
import { Button } from '../atoms/Button';

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between h-12 border-1 border-b-main desktop:h-[60px]">
      <div className="px-[10px] flex gap-2">
        <IconButton>Home</IconButton>
        <Button className="hidden desktop:block">File</Button>
        <Button className="hidden desktop:block">Settings</Button>
        <Button className="hidden desktop:block">1920px x 1080px</Button>
        <IconButton>Undo</IconButton>
        <IconButton>Redo</IconButton>
      </div>
      <div className="px-2 flex gap-2">
        <IconButton>Crown</IconButton>
        <IconButton>Dots</IconButton>
        <IconButton>Share</IconButton>
        <IconButton>Upload</IconButton>
      </div>
    </header>
  );
};
