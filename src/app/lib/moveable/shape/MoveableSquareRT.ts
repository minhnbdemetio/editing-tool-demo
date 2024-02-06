import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Corner, CornerType, Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';
import { v4 as uuidv4 } from 'uuid';

export class MoveableSquareRT extends MoveableShape {
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
    this.shapeType = MoveableShapeType.SquareRT;

    this.corners = {
      tr: { type: CornerType.Rounded, size: 20 },
      tl: { type: CornerType.Rounded, size: 20 },
    };
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
      return new MoveableSquareRT({
        ...this.toJSON(),
        id: uuidv4(),
      });
    }
    const clonedData = this.cloneData();

    return new MoveableSquareRT({
      ...this.toJSON(),
      id: uuidv4(),
    });
  }
}
