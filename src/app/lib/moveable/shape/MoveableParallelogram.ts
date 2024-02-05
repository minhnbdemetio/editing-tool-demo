import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Parallelogram } from '../svg/Parallelogram';
import { MoveableShape } from './MoveableShape';

export class MoveableParallelogram extends MoveableShape {
  constructor(options?: Partial<MoveableParallelogram>) {
    super(options);
    this.shapeType = MoveableShapeType.Parallelogram;
  }

  getShape() {
    return new Parallelogram({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableParallelogram>): MoveableObject {
    return new MoveableParallelogram(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
