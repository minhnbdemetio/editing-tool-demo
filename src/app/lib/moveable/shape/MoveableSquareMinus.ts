import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Corner, Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';
import { v4 as uuidv4 } from 'uuid';

export class MoveableSquareMinus extends MoveableShape {
  public corners?: {
    tl?: Corner;
    tr?: Corner;
    bl?: Corner;
    br?: Corner;
    all?: Corner;
  };

  constructor(options?: Partial<MoveableSquareMinus>) {
    super(options);
    this.shapeType = MoveableShapeType.Minus;

    this.corners = options?.corners;
    this.width = 100;
    this.height = 30;
  }

  getShape() {
    return new Square({
      width: this.width,
      height: this.height,
      corners: this.corners,
    });
  }

  clone(options?: Partial<MoveableSquareMinus>): MoveableObject {
    if (options) {
      return new MoveableSquareMinus(options);
    }

    return new MoveableSquareMinus({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
