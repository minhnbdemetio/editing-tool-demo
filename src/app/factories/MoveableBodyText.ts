import { MoveableTextObject } from './MoveableText';

export class MoveableBodyTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'body';
  }
  clone(options?: { htmlString: string; id: string }): MoveableBodyTextObject {
    if (options) {
      return new MoveableBodyTextObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableBodyTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
