import { MoveableObject } from './MoveableObject';

export class MoveablePhoto extends MoveableObject {
  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    if (options) {
      return new MoveablePhoto(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveablePhoto(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
  src: string;
  constructor(src: string, id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'photo';
    this.src = src;
  }
}
