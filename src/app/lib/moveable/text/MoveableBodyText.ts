import { v4 } from 'uuid';
import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableBodyTextObject extends MoveableTextObject {
  constructor(options?: Partial<MoveableBodyTextObject>) {
    super(options);
    this.variant = TextVariant.BODY;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.BODY_TEXT;
    this.lineHeight = this.textStyle.fontSize * 1.5;
  }
  clone(options?: Partial<MoveableBodyTextObject>): MoveableBodyTextObject {
    return new MoveableBodyTextObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
