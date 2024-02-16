import { MoveableObject } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Corner, CornerType, Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';
import { v4 as uuidv4 } from 'uuid';

export class MoveableInvertedRoundSquare extends MoveableShape {
  public corners?: {
    tl?: Corner;
    tr?: Corner;
    bl?: Corner;
    br?: Corner;
    all?: Corner;
  };

  constructor(options?: Partial<MoveableInvertedRoundSquare>) {
    super(options);
    this.shapeType = MoveableShapeType.InvertedRoundSquare;

    this.corners = { all: { type: CornerType.InvertedRound, size: 20 } };
  }

  getShape() {
    return new Square({
      width: this.width,
      height: this.height,
      corners: this.corners,
    });
  }

  clone(options?: Partial<MoveableInvertedRoundSquare>): MoveableObject {
    if (options) {
      return new MoveableInvertedRoundSquare(options);
    }

    return new MoveableInvertedRoundSquare({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
