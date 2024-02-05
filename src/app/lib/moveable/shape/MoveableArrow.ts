import { v4 } from 'uuid';
import { MoveableObject } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Arrow } from '../svg/Arrow';
import { MoveableShape } from './MoveableShape';

export class MoveableArrow extends MoveableShape {
  constructor(options?: Partial<MoveableArrow>) {
    super(options);
    this.shapeType = MoveableShapeType.Arrow;
  }

  getShape() {
    return new Arrow({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableArrow>): MoveableObject {
    return new MoveableArrow(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
