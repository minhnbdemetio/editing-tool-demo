import { FC, RefObject, useEffect } from 'react';

import { MoveableObject } from '@/app/factories/MoveableObject';
import { MoveableRectangleElement } from './MoveableRectangleElement';
import { MoveableTextElement } from './MoveableTextElement';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';

export interface MoveableObjectProps {
  object: MoveableObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableObjectElement: FC<MoveableObjectProps> = props => {
  const { containerRef, object } = props;
  const { setActiveMoveableObject } = useActiveMoveableObject();
  const { objectLoaded } = useLoadMoveableObject(containerRef, object);

  useEffect(() => {
    if (!objectLoaded) return;
    const element = object.getElement();
    if (!element) return;
    element.onclick = () => setActiveMoveableObject(object);
  }, [object, objectLoaded, setActiveMoveableObject]);

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
