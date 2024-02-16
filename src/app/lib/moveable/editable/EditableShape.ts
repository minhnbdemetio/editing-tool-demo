import { SvgShape } from '../svg/SvgShape';
import { PluggableText } from '../text/PluggableText';
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
  RoundedSquare,
  Parallelogram,
  Quadrangle,
  InvertedRoundSquare,
  SquareCutTr,
  SquareCutT,
  SquareCutTrBl,
  SquareRT,
  Minus,
}

export interface TextShape {
  shapeText: PluggableText;
  textWrapperId: string;

  editShapeText: () => void;
}

export interface EditableShape extends Editable, TextShape {
  shapeType: MoveableShapeType;
  shapeCornerRounding: number;
  shapeColor: string;
  shapeOutline: string;
  shapeShadow: string;

  getShape(): SvgShape;
}
