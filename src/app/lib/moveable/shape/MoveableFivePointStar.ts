import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { FivePointStar } from '../svg/FivePointStar';
import { Hexagon } from '../svg/Hexagon';
import { MoveableShape } from './MoveableShape';

export class MoveableFivePointStar extends MoveableShape {
  constructor(options?: Partial<MoveableFivePointStar>) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new FivePointStar({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableFivePointStar>): MoveableObject {
    return new MoveableFivePointStar(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
