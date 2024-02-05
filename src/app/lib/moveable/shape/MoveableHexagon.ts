import { v4 } from 'uuid';
import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Hexagon } from '../svg/Hexagon';
import { MoveableShape } from './MoveableShape';

export class MoveableHexagon extends MoveableShape {
  constructor(options?: Partial<MoveableHexagon>) {
    super(options);
    this.shapeType = MoveableShapeType.Hexagon;
  }

  getShape() {
    return new Hexagon({ width: this.width, height: this.height });
  }

  clone(options?: Partial<MoveableHexagon>): MoveableObject {
    return new MoveableHexagon(
      options
        ? options
        : {
            ...this.toJSON(),
            id: v4(),
          },
    );
  }
}
