import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Pentagon } from '../svg/Pentagon';
import { MoveableShape } from './MoveableShape';

export class MoveablePentagon extends MoveableShape {
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
    return new Pentagon({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveablePentagon({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
