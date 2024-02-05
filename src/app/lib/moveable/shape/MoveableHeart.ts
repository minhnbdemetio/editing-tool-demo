import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Heart } from '../svg/Heart';
import { Triangle } from '../svg/Triangle';
import { MoveableShape } from './MoveableShape';

export class MoveableHeart extends MoveableShape {
  constructor(options?: Partial<MoveableHeart>) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new Heart({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableHeart>): MoveableObject {
    return new MoveableHeart(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
