import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Pentagon } from '../svg/Pentagon';
import { MoveableShape } from './MoveableShape';

export class MoveablePentagon extends MoveableShape {
  constructor(options?: Partial<MoveablePentagon>) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new Pentagon({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveablePentagon>): MoveableObject {
    return new MoveablePentagon(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
