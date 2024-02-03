import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Octagon } from '../svg/Octagon';
import { MoveableShape } from './MoveableShape';

export class MoveableOctagon extends MoveableShape {
  constructor(options?: Partial<MoveableOctagon>) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new Octagon({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableOctagon>): MoveableObject {
    return new MoveableOctagon(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
