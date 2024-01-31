import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Parallelogram } from '../svg/Parallelogram';
import { MoveableShape } from './MoveableShape';

export class MoveableParallelogram extends MoveableShape {
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
    return new Parallelogram({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableParallelogram({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
