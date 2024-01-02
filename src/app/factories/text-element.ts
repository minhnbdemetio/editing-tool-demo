import { fabric } from 'fabric';

export class HeadingText extends fabric.IText {
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

export class SubheadingText extends fabric.IText {
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

export class BodyText extends fabric.IText {
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
