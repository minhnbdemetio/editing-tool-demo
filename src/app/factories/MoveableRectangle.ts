import { MoveableObject } from './MoveableObject';

export class MoveableRectangleObject extends MoveableObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'rectangle';
  }
  clone(): MoveableRectangleObject {
    const clonedData = this.cloneData();
    return new MoveableRectangleObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
