import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Square } from '../svg/Square';
import { MoveableShape } from './MoveableShape';

export class MoveableSquare extends MoveableShape {
  public rounded: number = 0;
  public reverseRounded?: boolean = false;
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
    rounded?: number;
    reverseRounded?: boolean;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Square;

    this.rounded = options?.rounded || 0;
    this.reverseRounded = options?.reverseRounded || false;
  }

  getShape() {
    return new Square({
      width: this.width,
      height: this.height,
      rounded: this.rounded,
      reverseRounded: this.reverseRounded,
    });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableSquare({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
