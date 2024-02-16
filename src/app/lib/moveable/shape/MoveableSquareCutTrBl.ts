import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Corner, CornerType, Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';
import { v4 as uuidv4 } from 'uuid';

export class MoveableSquareCutTrBl extends MoveableShape {
  public corners?: {
    tl?: Corner;
    tr?: Corner;
    bl?: Corner;
    br?: Corner;
    all?: Corner;
  };

  constructor(options?: Partial<MoveableSquareCutTrBl>) {
    super(options);
    this.shapeType = MoveableShapeType.SquareCutTrBl;

    this.corners = {
      tr: { type: CornerType.Cut, size: 20 },
      bl: { type: CornerType.Cut, size: 20 },
    };
  }

  getShape() {
    return new Square({
      width: this.width,
      height: this.height,
      corners: this.corners,
    });
  }

  clone(options?: Partial<MoveableSquareCutTrBl>): MoveableObject {
    if (options) {
      return new MoveableSquareCutTrBl(options);
    }

    return new MoveableSquareCutTrBl({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
