import { TextFormat } from '@/app/atoms/TextFormat';
import { useActiveMoveableShapeObject } from '@/app/hooks/useActiveMoveableObject';
import { FC } from 'react';

interface FormatPropertyProps {}

export const ShapeFormatProperty: FC<FormatPropertyProps> = ({}) => {
  const activeShape = useActiveMoveableShapeObject();
  return <TextFormat activeText={activeShape?.shapeText || null} />;
};
