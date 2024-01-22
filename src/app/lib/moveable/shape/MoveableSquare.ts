import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { MoveableShape } from './MoveableShape';

export class MoveableSquare extends MoveableShape {
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
    return '<path d="M0,0V952.2H952.2V0Z" fill="currentColor"  isInit="true"></path>';
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
