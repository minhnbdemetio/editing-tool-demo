import { fabric } from 'fabric';
import { get } from 'lodash';

export class CustomizableIText extends fabric.IText {
  customizable: boolean;
  originalText: string | undefined;
  textTransform: string;

  constructor(text: string, options?: fabric.ITextOptions | undefined) {
    super(text, options);
    this.customizable = true;
    this.textTransform = 'normal';
    this.originalText = this.text;
  }

  onInput(e: Event): void {
    this.originalText = this.hiddenTextarea?.value;
    super.onInput(e);
  }

  setTextTransform(form: 'normal' | 'uppercase') {
    if (!this.text) return;
    switch (form) {
      case 'uppercase': {
        this.text = this.text.toUpperCase();
        this.textTransform = 'uppercase';
        return;
      }
      case 'normal': {
        this.text = this.originalText;
        this.textTransform = 'normal';
        return;
      }
    }
  }
}

export class HeadingText extends CustomizableIText {
  constructor() {
    super('Add a heading', {
      left: 50,
      top: 50,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
  }
}

export class SubheadingText extends CustomizableIText {
  constructor() {
    super('Add a subheading', {
      left: 50,
      top: 50,
      fontSize: 15,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
  }
}

export class BodyText extends CustomizableIText {
  constructor() {
    super('Add a body text', {
      left: 50,
      top: 50,
      fontSize: 10,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
  }
}
