import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'subheading';
  }
  clone(): MoveableSubheadingTextObject {
    const clonedData = this.cloneData();
    return new MoveableSubheadingTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
