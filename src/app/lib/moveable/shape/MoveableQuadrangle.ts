import { MoveableObject, ObjectType } from '../MoveableObject';
import { MoveableShapeType } from '../editable/EditableShape';
import { Pentagon } from '../svg/Pentagon';
import { Quadrangle } from '../svg/Quadrangle';
import { MoveableShape } from './MoveableShape';

export class MoveableQuadrangle extends MoveableShape {
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
    return new Quadrangle({ width: this.width, height: this.height });
  }

  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    const clonedData = this.cloneData();

    return new MoveableQuadrangle({
      ...this.toJSON(),
      id: clonedData.cloneObjectId,
    });
  }
}
