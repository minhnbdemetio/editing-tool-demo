import { CurrentCanvasContext } from '@/app/contexts/CurrentCanvas';
import { useContext } from 'react';

export const useCurrentCanvas = () => useContext(CurrentCanvasContext);
