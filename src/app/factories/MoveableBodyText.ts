import { MoveableTextObject } from './MoveableText';

export class MoveableBodyTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'body';
  }
  clone(): MoveableBodyTextObject {
    const clonedData = this.cloneData();
    return new MoveableBodyTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
