import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { FivePointStar } from '../svg/FivePointStar';
import { Hexagon } from '../svg/Hexagon';
import { MoveableShape } from './MoveableShape';

export class MoveableFivePointStar extends MoveableShape {
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Square;
  }

  getShape() {
    return new FivePointStar({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableFivePointStar({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
