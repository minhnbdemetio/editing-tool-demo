import { IMoveableObjectProperties } from './MoveableObject';

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
}

export interface IMoveableShapeProperties extends IMoveableObjectProperties {
  shapeType: MoveableShapeType;
  shapeCornerRounding: number;
  shapeColor: string;
  shapeOutline: string;
  shapeShadow: string;
  shapeText: undefined; // text object
}

export interface IMoveableShapeRenderer {
  getShape(shapeType: MoveableShapeType): string; // svg string
}

export interface IMoveableShape
  extends IMoveableShapeProperties,
    IMoveableShapeRenderer {
  toObject: () => IMoveableShapeProperties;
  setup: (properties: IMoveableShapeProperties) => void;
}
