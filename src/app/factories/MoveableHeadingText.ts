import { MoveableTextObject } from './MoveableText';

export class MoveableHeadingTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'heading';
  }
  clone(options?: {
    htmlString: string;
    id: string;
  }): MoveableHeadingTextObject {
    if (options) {
      return new MoveableHeadingTextObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableHeadingTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
