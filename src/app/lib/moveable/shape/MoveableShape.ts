import { MoveableObject, ObjectType } from '../MoveableObject';
import { EditableShape, MoveableShapeType } from '../editable/EditableShape';
import { Square } from '../svg/Square';
import { SvgShape } from '../svg/SvgShape';

export abstract class MoveableShape
  extends MoveableObject
  implements EditableShape
{
  shapeCornerRounding: number = 0;
  shapeColor: string = '#e8e8e8';
  shapeOutline: string = '#000';
  shapeShadow: string = '#000';
  shapeText: undefined;
  shapeType: MoveableShapeType = MoveableShapeType.Square;

  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
    width?: number;
    height?: number;
  }) {
    super(options);
    this.type = 'shape';
  }
  abstract getShape(): SvgShape;

  toJSON() {
    return {
      ...super.toJSON(),
      shapeColor: this.shapeColor,
      shapeCornerRounding: this.shapeCornerRounding,
      shapeOutline: this.shapeOutline,
      shapeShadow: this.shapeShadow,
      shapeText: this.shapeText,
      shapeType: this.shapeType,
    };
  }

  toSVG() {
    const shape = this.getShape();

    return `
    <svg  fill="${this.shapeColor}" width="${this.width}" height="${
      this.height
    }">
      <g>
        ${shape.getPath()}
      </g>
    </svg>
    `;
  }

  render() {
    const svg = this.toSVG();
    const element = this.getElement();

    if (element) {
      element.innerHTML = svg;
    }
  }

  // setup(properties: Partial<IMoveableShapeProperties>): void {
  //   this.shapeColor = properties.shapeColor || '#000';
  //   this.shapeCornerRounding = properties.shapeCornerRounding || 0;
  //   this.shapeOutline = properties.shapeOutline || '#000';
  //   this.shapeShadow = properties.shapeShadow || '#000';
  //   this.shapeText = properties.shapeText;
  //   this.shapeType = properties.shapeType || MoveableShapeType.Square;
  // }
}
