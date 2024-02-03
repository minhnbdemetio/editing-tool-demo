import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { SquaredTriangle } from '../svg/SquaredTriangle';
import { MoveableShape } from './MoveableShape';

export class MoveableSquaredTriangle extends MoveableShape {
  constructor(options?: Partial<MoveableSquaredTriangle>) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new SquaredTriangle({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableSquaredTriangle>): MoveableObject {
    return new MoveableSquaredTriangle(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
