import { MoveableObject } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Corner, CornerType, Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';
import { v4 as uuidv4 } from 'uuid';

export class MoveableSquareCutT extends MoveableShape {
  public corners?: {
    tl?: Corner;
    tr?: Corner;
    bl?: Corner;
    br?: Corner;
    all?: Corner;
  };

  constructor(options?: Partial<MoveableSquareCutT>) {
    super(options);
    this.shapeType = MoveableShapeType.SquareCutT;

    this.corners = {
      tr: { type: CornerType.Cut, size: 20 },
      tl: { type: CornerType.Cut, size: 20 },
    };
  }

  getShape() {
    return new Square({
      width: this.width,
      height: this.height,
      corners: this.corners,
    });
  }

  clone(options?: Partial<MoveableSquareCutT>): MoveableObject {
    if (options) {
      return new MoveableSquareCutT(options);
    }

    return new MoveableSquareCutT({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
