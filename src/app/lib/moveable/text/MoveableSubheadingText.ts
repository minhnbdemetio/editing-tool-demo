import { TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVariant.SUBHEADING;
    this.textStyle.fontSize = 18;
    this.lineHeight = this.textStyle.fontSize * 1.5;
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
