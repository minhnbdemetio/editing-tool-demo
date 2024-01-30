import { TextVarient } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVarient.SUBHEADING;
    this.fontSize = 18;
    this.lineHeight = this.fontSize * 1.5;
    this.textStyle = TextVarient.SUBHEADING;
  }
  clone(options?: {
    htmlString: string;
    id: string;
  }): MoveableSubheadingTextObject {
    if (options) {
      return new MoveableSubheadingTextObject({
        id: options.id,
        htmlString: options.htmlString,
      });
    }
    const clonedData = this.cloneData();
    return new MoveableSubheadingTextObject({
      id: clonedData.cloneObjectId,
      htmlString: clonedData.clonedObjectHtml,
    });
  }
}
