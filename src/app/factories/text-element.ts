import { fabric } from 'fabric';
import { get } from 'lodash';

export class CustomizableIText extends fabric.IText {
  customizable: boolean;
  originalText: string | undefined;
  textTransform: string;
  listType: string | undefined;

  constructor(text: string, options?: fabric.ITextOptions | undefined) {
    super(text, options);
    this.customizable = true;
    this.textTransform = 'normal';
    this.originalText = this.text;
    this.listType = 'normal';
  }

  onInput(e: Event): void {
    if (this.hiddenTextarea) {
      const hiddenTextAreaValue = this.hiddenTextarea.value;
      this.originalText = hiddenTextAreaValue;
      this.hiddenTextarea.value =
        this.formatTextByListType(hiddenTextAreaValue);
    }

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

  setOrderListText(listType: 'normal' | 'disc' | 'number'): void {
    this.listType = listType;
    this.text = this.formatTextByListType(this.text);
  }

  formatTextByListType(text?: string): string {
    if (!text) return '';
    const originalText = text
      .replace(/• /g, '')
      .replace(/\d+\. /g, '')
      .replace(/\n•$/g, '')
      .replace(/\n\d+.$/g, '');
    switch (this.listType) {
      case 'number': {
        return originalText
          .split('\n')
          .map((text, index) => `${index + 1}. ${text}`)
          .join('\n');
      }
      case 'disc': {
        return originalText
          .split('\n')
          .map(text => `• ${text}`)
          .join('\n');
      }
      default: {
        return originalText;
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
