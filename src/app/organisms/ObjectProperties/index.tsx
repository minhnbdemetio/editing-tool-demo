import { FC } from 'react';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { useActiveObject } from '@/app/store/active-object';
import { TextProperties } from './TextProperties';

interface ObjectPropertiesProps {}

export const ObjectProperties: FC<ObjectPropertiesProps> = ({}) => {
  const { activeObject } = useActiveObject();

  const renderMenuPropertyComponent = () => {
    switch (activeObject?.type) {
      case 'i-text': {
        return <TextProperties />;
      }

      default: {
        return <PhotoMenuProperty />;
      }
    }
  };

  return renderMenuPropertyComponent();
};
