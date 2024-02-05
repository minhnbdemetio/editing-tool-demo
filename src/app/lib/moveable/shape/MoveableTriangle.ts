import { v4 } from 'uuid';
import { MoveableObject } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Triangle } from '../svg/Triangle';
import { MoveableShape } from './MoveableShape';

export class MoveableTriangle extends MoveableShape {
  constructor(options?: Partial<MoveableTriangle>) {
    super(options);
    this.shapeType = MoveableShapeType.Triangle;
  }

  getShape() {
    return new Triangle({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableTriangle>): MoveableObject {
    return new MoveableTriangle(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
