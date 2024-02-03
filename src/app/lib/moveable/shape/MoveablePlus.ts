import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Plus } from '../svg/Plus';
import { MoveableShape } from './MoveableShape';

export class MoveablePlus extends MoveableShape {
  constructor(options?: Partial<MoveablePlus>) {
    super(options);
    this.shapeType = MoveableShapeType.Plus;
  }

  getShape() {
    return new Plus({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveablePlus>): MoveableObject {
    return new MoveablePlus(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
