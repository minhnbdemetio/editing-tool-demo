import { FC, RefObject } from 'react';

import { MoveableObject } from '@/app/factories/MoveableObject';
import { MoveableRectangleElement } from './MoveableRectangleElement';
import { MoveableTextElement } from './MoveableTextElement';

interface MoveableObjectProps {
  object: MoveableObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableObjectElement: FC<MoveableObjectProps> = props => {
  const renderElement = () => {
    switch (props.object.type) {
      case 'rectangle': {
        return <MoveableRectangleElement {...props} />;
      }
      case 'text': {
        return <MoveableTextElement {...props} />;
      }
    }
  };

  return renderElement();
};
