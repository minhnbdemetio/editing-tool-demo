import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Octagon } from '../svg/Octagon';
import { MoveableShape } from './MoveableShape';

export class MoveableOctagon extends MoveableShape {
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Octagon;
  }

  getShape() {
    return new Octagon({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableOctagon({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
