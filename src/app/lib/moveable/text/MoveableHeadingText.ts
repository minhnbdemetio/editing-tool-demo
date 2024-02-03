import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableHeadingTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVariant.HEADING;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.HEADING;
    this.lineHeight = this.textStyle.fontSize * 1.5;
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
