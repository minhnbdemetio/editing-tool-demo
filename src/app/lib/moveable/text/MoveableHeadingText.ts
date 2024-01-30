import { TextVarient } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableHeadingTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVarient.HEADING;
    this.fontSize = 30;
    this.lineHeight = this.fontSize * 1.5;
    this.textStyle = TextVarient.HEADING;
  }
  clone(options?: {
    htmlString: string;
    id: string;
  }): MoveableHeadingTextObject {
    if (options) {
      return new MoveableHeadingTextObject({
        id: options.id,
        htmlString: options.htmlString,
      });
    }
    const clonedData = this.cloneData();
    return new MoveableHeadingTextObject({
      id: clonedData.cloneObjectId,
      htmlString: clonedData.clonedObjectHtml,
    });
  }
}
