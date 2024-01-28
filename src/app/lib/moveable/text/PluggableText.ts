import { MoveableTextObject } from './MoveableText';

export class PluggableText extends MoveableTextObject {
  private textWrapperId: string;
  constructor(
    textWrapperId: string,
    options?: { id: string; htmlString: string },
  ) {
    super(options);

    this.textWrapperId = textWrapperId;
  }

  getElement(): HTMLElement | null {
    return document.getElementById(this.textWrapperId);
  }
}
