import { PhotoPosition } from './Croppable';

export interface CanMakeBackground {
  setBackground(activePageId: string): void;
  isBackground: boolean;
  backgroundStartPosition?: PhotoPosition;
}
