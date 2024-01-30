export type PhotoPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface Croppable {
  cropPosition?: PhotoPosition;
  setPhotoObjectPosition(
    position: PhotoPosition,
    originPosition: PhotoPosition,
    activePageId: string,
  ): void;

  updateCropPosition(xChanged: number, yChanged: number): void;
}
