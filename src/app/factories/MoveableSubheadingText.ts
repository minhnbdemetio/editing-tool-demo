import { MoveableTextObject } from './MoveableText';

export class MoveableSubheadingTextObject extends MoveableTextObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.variant = 'subheading';
  }
  clone(options?: {
    htmlString: string;
    id: string;
  }): MoveableSubheadingTextObject {
    if (options) {
      return new MoveableSubheadingTextObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableSubheadingTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
