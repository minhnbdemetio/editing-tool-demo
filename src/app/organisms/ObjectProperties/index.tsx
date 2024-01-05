import { FC } from 'react';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { useActiveObject } from '@/app/store/active-object';
import { TextProperties } from './TextProperties';
import { isILine, isIText } from '@/app/utilities/canvas';
import { LineProperties } from './LineProperties';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeObject } = useActiveObject();

  if (isIText(activeObject)) return <TextProperties />;
  if (isILine(activeObject)) return <LineProperties />;

  return <PhotoMenuProperty />;
};
