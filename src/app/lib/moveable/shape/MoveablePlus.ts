import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Plus } from '../svg/Plus';
import { MoveableShape } from './MoveableShape';

export class MoveablePlus extends MoveableShape {
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Plus;
  }

  getShape() {
    return new Plus({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveablePlus({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
