import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { SquaredTriangle } from '../svg/SquaredTriangle';
import { Triangle } from '../svg/Triangle';
import { MoveableShape } from './MoveableShape';

export class MoveableSquaredTriangle extends MoveableShape {
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
    return new SquaredTriangle({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableSquaredTriangle({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
