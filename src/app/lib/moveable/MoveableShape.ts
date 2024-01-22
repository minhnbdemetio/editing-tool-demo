import {
  IMoveableShape,
  IMoveableShapeProperties,
  MoveableShapeType,
} from '@/app/interfaces/MoveableShape';
import { MoveableObject } from './MoveableObject';

export class MoveableShape extends MoveableObject implements IMoveableShape {
  shapeCornerRounding: number = 0;
  shapeColor: string = '#e8e8e8';
  shapeOutline: string = '#000';
  shapeShadow: string = '#000';
  shapeText: undefined;
  shapeType: MoveableShapeType = MoveableShapeType.Square;

  constructor(options: Partial<IMoveableShapeProperties>) {
    super(options);
    this.setup(options);
  }
  getShape(shapeType: MoveableShapeType): string {
    switch (shapeType) {
      case MoveableShapeType.Square:
        return '<path d="M0,0V952.2H952.2V0Z" fill="currentColor"  isInit="true"></path>';
      default:
        return '';
    }
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableShape({
      ...this.toObject(),
      id: clonedData.cloneObjectId,
    });
  }

  toObject(): IMoveableShapeProperties {
    const superProperties = super.toObject();

    return {
      ...superProperties,
      shapeColor: this.shapeColor,
      shapeCornerRounding: this.shapeCornerRounding,
      shapeOutline: this.shapeOutline,
      shapeShadow: this.shapeShadow,
      shapeText: this.shapeText,
      shapeType: this.shapeType,
    };
  }

  setup(properties: Partial<IMoveableShapeProperties>): void {
    this.shapeColor = properties.shapeColor || '#000';
    this.shapeCornerRounding = properties.shapeCornerRounding || 0;
    this.shapeOutline = properties.shapeOutline || '#000';
    this.shapeShadow = properties.shapeShadow || '#000';
    this.shapeText = properties.shapeText;
    this.shapeType = properties.shapeType || MoveableShapeType.Square;
  }
}
