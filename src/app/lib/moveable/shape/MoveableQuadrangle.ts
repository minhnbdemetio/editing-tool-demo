import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Quadrangle } from '../svg/Quadrangle';
import { MoveableShape } from './MoveableShape';

export class MoveableQuadrangle extends MoveableShape {
  constructor(options?: Partial<MoveableQuadrangle>) {
    super(options);
    this.shapeType = MoveableShapeType.Quadrangle;
  }

  getShape() {
    return new Quadrangle({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableQuadrangle>): MoveableObject {
    return new MoveableQuadrangle(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
