import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Triangle } from '../svg/Triangle';
import { MoveableShape } from './MoveableShape';

export class MoveableTriangle extends MoveableShape {
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
    return new Triangle({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableTriangle({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
