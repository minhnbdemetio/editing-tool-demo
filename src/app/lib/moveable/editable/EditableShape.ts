import { SvgShape } from '../svg/SvgShape';
import { Editable } from './Editable';

export enum MoveableShapeType {
  Square,
  Triangle,
  SquaredTriangle,
  Heart,
  Pentagon,
  Hexagon,
  Octagon,
  FivePointStar,
  SixPointStar,
  EightPointStart,
  Plus,
  Arrow,
}

export interface EditableShape extends Editable {
  shapeType: MoveableShapeType;
  shapeCornerRounding: number;
  shapeColor: string;
  shapeOutline: string;
  shapeShadow: string;
  shapeText: undefined;
  getShape(): SvgShape;
}
