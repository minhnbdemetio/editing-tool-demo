import { FC, useEffect } from 'react';

import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import { MoveableNormalTextElement } from './text/MoveableNormalTextElement';
import { MoveableLineElement } from './MoveableLineElement';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { MoveableHeadingTextElement } from './text/MoveableHeadingTextElement';
import {
  isBodyText,
  isHeading,
  isLine,
  isNormalText,
  isPhoto,
  isSubheading,
} from '@/app/utilities/moveable';
import { MoveableSubheadingTextElement } from './text/MoveableSubheadingTextElement';
import { MoveableBodyTextElement } from './text/MoveableBodyTextElement';
import { MoveablePhotoElement } from './MoveablePhotoElement';
import { OBJECT_CONTAINER } from '@/app/lib/moveable/constant/object';

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
    if (isNormalText(object)) {
      return <MoveableNormalTextElement object={object} />;
    }

    if (isLine(object)) {
      return <MoveableLineElement object={object} />;
    }

    if (isHeading(object)) {
      return <MoveableHeadingTextElement object={object} />;
    }

    if (isSubheading(object)) {
      return <MoveableSubheadingTextElement object={object} />;
    }

    if (isBodyText(object)) {
      return <MoveableBodyTextElement object={object} />;
    }
    if (isPhoto(object)) {
      return <MoveablePhotoElement object={object} />;
    }

    return null;
  };

  return <div id={`${OBJECT_CONTAINER}-${object.id}`}>{renderElement()}</div>;
};
