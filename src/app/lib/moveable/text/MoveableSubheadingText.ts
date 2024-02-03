import { v4 } from 'uuid';
import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(options?: Partial<MoveableSubheadingTextObject>) {
    super(options);
    this.variant = TextVariant.SUBHEADING;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.SUBHEADING;
    this.lineHeight = this.textStyle.fontSize * 1.5;
  }
  clone(
    options?: Partial<MoveableSubheadingTextObject>,
  ): MoveableSubheadingTextObject {
    return new MoveableSubheadingTextObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
