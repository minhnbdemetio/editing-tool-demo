import { FC } from 'react';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { useActiveObject } from '@/app/store/active-object';
import { TextProperties } from './TextProperties';
import { isIText } from '@/app/utilities/canvas';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeObject } = useActiveObject();

  if (isIText(activeObject)) return <TextProperties />;

  return <PhotoMenuProperty />;
};
