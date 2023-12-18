'use client';

import { PropsWithChildren, FC, useState } from 'react';
import { CurrentCanvasContext } from '../contexts/CurrentCanvas';

export const CurrentCanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentCanvas, setCurrentCanvas] = useState<fabric.Canvas | null>(
    null,
  );

  return (
    <CurrentCanvasContext.Provider value={{ currentCanvas, setCurrentCanvas }}>
      {children}
    </CurrentCanvasContext.Provider>
  );
};
