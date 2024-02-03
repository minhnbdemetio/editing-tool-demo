import { v4 } from 'uuid';
import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableHeadingTextObject extends MoveableTextObject {
  constructor(options?: Partial<MoveableHeadingTextObject>) {
    super(options);
    this.variant = TextVariant.HEADING;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.HEADING;
  }
  clone(
    options?: Partial<MoveableHeadingTextObject>,
  ): MoveableHeadingTextObject {
    return new MoveableHeadingTextObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
