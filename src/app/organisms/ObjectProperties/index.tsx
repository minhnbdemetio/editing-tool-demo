import { FC } from 'react';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { TextProperties } from './TextProperties';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { isText } from '@/app/utilities/moveable';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeMoveableObject } = useActiveMoveableObject();

  if (isText(activeMoveableObject)) return <TextProperties />;

  return <PhotoMenuProperty />;
};
