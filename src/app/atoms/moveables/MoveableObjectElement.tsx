import { FC, useEffect } from 'react';

import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import { MoveableLineElement } from './MoveableLineElement';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { isLine, isPhoto, isShape, isText } from '@/app/utilities/moveable';
import { MoveablePhotoElement } from './MoveablePhotoElement';
import { OBJECT_CONTAINER } from '@/app/lib/moveable/constant/object';
import { MoveableShapeElement } from './MoveableShapeElement';
import { MoveableTextElement } from './MoveableTextElement';

export interface MoveableObjectProps {
  object: MoveableObject;
  className?: string;
}

export const MoveableObjectElement: FC<MoveableObjectProps> = props => {
  const { object } = props;
  const { objectLoaded } = useLoadMoveableObject(object);

  useEffect(() => {
    if (!objectLoaded) return;
    const element = object.getElement();
    if (!element) return;
  }, [object, objectLoaded]);

  const renderElement = () => {
    if (isText(object)) {
      return <MoveableTextElement object={object} />;
    }
    if (isLine(object)) {
      return <MoveableLineElement object={object} />;
    }
    if (isPhoto(object)) {
      return <MoveablePhotoElement object={object} />;
    }
    if (isShape(object)) {
      return <MoveableShapeElement object={object} />;
    }

    return null;
  };

  return <div id={`${OBJECT_CONTAINER}-${object.id}`}>{renderElement()}</div>;
};
