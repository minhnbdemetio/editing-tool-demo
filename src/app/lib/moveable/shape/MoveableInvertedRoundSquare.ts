import { MoveableObject, ObjectType } from '../MoveableObject';
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

  constructor(options?: {
    id?: string;
    type?: ObjectType;
    pageId?: string | null;
    htmlString?: string;
    width?: number;
    height?: number;
    corners?: {
      tl?: Corner;
      tr?: Corner;
      bl?: Corner;
      br?: Corner;
      all?: Corner;
    };
  }) {
    super(options as any);
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

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    if (options) {
      return new MoveableInvertedRoundSquare({
        ...this.toJSON(),
        id: uuidv4(),
      });
    }
    const clonedData = this.cloneData();
    console.log('idddddd', uuidv4());

    return new MoveableInvertedRoundSquare({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
