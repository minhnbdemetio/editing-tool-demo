import { TextVarient } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableBodyTextObject extends MoveableTextObject {
  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.variant = TextVarient.BODY;
    this.fontSize = 12;
    this.lineHeight = this.fontSize * 1.5;
    this.textStyle = TextVarient.BODY;
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
