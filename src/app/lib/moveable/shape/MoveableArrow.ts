import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Arrow } from '../svg/Arrow';
import { Plus } from '../svg/Plus';
import { MoveableShape } from './MoveableShape';

export class MoveableArrow extends MoveableShape {
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Arrow;
  }

  getShape() {
    return new Arrow({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableArrow({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
