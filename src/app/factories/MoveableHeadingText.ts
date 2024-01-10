import { MoveableTextObject } from './MoveableText';

export class MoveableHeadingTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'heading';
  }
  clone(): MoveableHeadingTextObject {
    const clonedData = this.cloneData();
    return new MoveableHeadingTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
