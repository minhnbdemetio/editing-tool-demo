export type PhotoPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface Croppable {
  cropPosition?: PhotoPosition;
  originalSize: {
    width: number;
    height: number;
  };
  isCropping: boolean;
  cropMaskId: string;

  setPhotoObjectPosition(
    position: PhotoPosition,
    originPosition: PhotoPosition,
    activePageId: string,
  ): void;

  updateCropPosition(xChanged: number, yChanged: number): void;

  crop(newCropPosition: PhotoPosition): void;
  rejectCrop(): void;

  setIsCropping(isCropping: boolean): void;
  getIsCropping(): boolean;

  renderCropMask(photoPosition: PhotoPosition): void;
  cleanCropMask(): void;
}
