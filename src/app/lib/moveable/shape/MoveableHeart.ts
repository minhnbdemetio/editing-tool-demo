import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Heart } from '../svg/Heart';
import { Triangle } from '../svg/Triangle';
import { MoveableShape } from './MoveableShape';

export class MoveableHeart extends MoveableShape {
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
    return new Heart({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableHeart({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
