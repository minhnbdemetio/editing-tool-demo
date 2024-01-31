import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Hexagon } from '../svg/Hexagon';
import { MoveableShape } from './MoveableShape';

export class MoveableHexagon extends MoveableShape {
  constructor(options?: {
    id: string;
    type?: ObjectType;
    pageId: string | null;
    htmlString?: string;
  }) {
    super(options);
    this.shapeType = MoveableShapeType.Hexagon;
  }

  getShape() {
    return new Hexagon({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableHexagon({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
