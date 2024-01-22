import { MoveableObject, ObjectType } from '../MoveableObject';
import { EditableShape, MoveableShapeType } from '../editable/EditableShape';

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
  }) {
    super(options);
    this.type = 'shape';
  }
  abstract getShape(): string;

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

  // setup(properties: Partial<IMoveableShapeProperties>): void {
  //   this.shapeColor = properties.shapeColor || '#000';
  //   this.shapeCornerRounding = properties.shapeCornerRounding || 0;
  //   this.shapeOutline = properties.shapeOutline || '#000';
  //   this.shapeShadow = properties.shapeShadow || '#000';
  //   this.shapeText = properties.shapeText;
  //   this.shapeType = properties.shapeType || MoveableShapeType.Square;
  // }
}
