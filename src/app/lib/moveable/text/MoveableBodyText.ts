import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableBodyTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVariant.BODY;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.BODY_TEXT;
    this.lineHeight = this.textStyle.fontSize * 1.5;
  }
  clone(options?: { htmlString: string; id: string }): MoveableBodyTextObject {
    if (options) {
      return new MoveableBodyTextObject({
        id: options.id,
        htmlString: options.htmlString,
      });
    }
    const clonedData = this.cloneData();
    return new MoveableBodyTextObject({
      id: clonedData.cloneObjectId,
      htmlString: clonedData.clonedObjectHtml,
    });
  }
}
