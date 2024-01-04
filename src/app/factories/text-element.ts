import { fabric } from 'fabric';
import { get } from 'lodash';

export class CustomizableIText extends fabric.IText {
  customizable: boolean;
  textHolderSpan: HTMLSpanElement;
  textTransform: string;

  constructor(text: string, options?: fabric.ITextOptions | undefined) {
    super(text, options);
    this.customizable = true;
    this.textTransform = 'normal';
    this.textHolderSpan = document.createElement('span');
    this.textHolderSpan.innerHTML = this.text || '';
    this.textHolderSpan.style.width = '0px';
    this.textHolderSpan.style.height = '0px';
    this.textHolderSpan.style.position = 'absolute';
    this.textHolderSpan.style.opacity = '0';
    this.textHolderSpan.style.zIndex = '-999';
    document.body.appendChild(this.textHolderSpan);
  }

  onInput(e: Event): void {
    super.onInput(e);
    this.textHolderSpan.innerHTML = get(e.target, 'value', '');
  }

  setTextTransform(form: 'normal' | 'uppercase') {
    if (!this.textHolderSpan) return;
    switch (form) {
      case 'uppercase': {
        this.textHolderSpan.style.textTransform = 'uppercase';
        console.log(this.textHolderSpan.innerText);
        this.text = this.textHolderSpan.innerText;
        this.textTransform = 'uppercase';
        return;
      }
      case 'normal': {
        this.textHolderSpan.style.textTransform = 'none';
        this.text = this.textHolderSpan.innerText;
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
