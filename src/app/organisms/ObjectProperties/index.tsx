import { FC } from 'react';
import { PhotoMenuProperties } from './PhotoMenuProperties';
import { TextProperties } from './TextProperties';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { isLine, isShape, isText } from '@/app/utilities/moveable';
import { LineProperties } from './LineProperties';
import { ShapeProperties } from './ShapeProperties';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeMoveableObject } = useActiveMoveableObject();

  if (isText(activeMoveableObject)) return <TextProperties />;
  if (isLine(activeMoveableObject)) return <LineProperties />;
  if (isShape(activeMoveableObject)) {
    return <ShapeProperties />;
  }

  return <PhotoMenuProperties />;
};
