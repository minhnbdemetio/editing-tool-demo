import { FC } from 'react';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { TextProperties } from './TextProperties';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { isLine, isText } from '@/app/utilities/moveable';
import { LineProperties } from './LineProperties';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeMoveableObject } = useActiveMoveableObject();

  if (isText(activeMoveableObject)) return <TextProperties />;
  if (isLine(activeMoveableObject)) return <LineProperties />;

  return <PhotoMenuProperty />;
};
