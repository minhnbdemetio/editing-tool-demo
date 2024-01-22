import { MoveableObject } from './MoveableObject';

export class MoveableRectangleObject extends MoveableObject {
  constructor(id?: string, htmlString?: string) {
    super({ id, htmlString });
    this.type = 'rectangle';
  }
  clone(options?: { htmlString: string; id: string }): MoveableRectangleObject {
    if (options) {
      return new MoveableRectangleObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableRectangleObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
