import { v4 } from 'uuid';
import { TEXT_STYLE_FONT_SIZE, TextVariant } from '../constant/text';
import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(options?: Partial<MoveableSubheadingTextObject>) {
    super(options);
    this.text = 'Add a subheading';
    this.variant = TextVariant.SUBHEADING;
    this.textStyle.fontSize = TEXT_STYLE_FONT_SIZE.SUBHEADING;
  }
  clone(
    options?: Partial<MoveableSubheadingTextObject>,
  ): MoveableSubheadingTextObject {
    return new MoveableSubheadingTextObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
