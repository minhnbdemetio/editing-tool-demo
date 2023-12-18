import React from 'react';

export const CurrentCanvasContext = React.createContext<{
  currentCanvas: fabric.Canvas | null;
  setCurrentCanvas: (canvas: fabric.Canvas | null) => void;
}>({ currentCanvas: null, setCurrentCanvas: () => {} });
