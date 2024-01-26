import {
  useActiveMoveableShapeObject,
  useActivePhotoObject,
  useSetBackgroundImage,
} from '@/app/hooks/useActiveMoveableObject';
import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';

const checkLockedObject = (activeObject: MoveableObject) =>
  !activeObject.isLocked;

const SHAPE_PROPERTIES = [
  {
    label: 'Color',
    value: SelectedProperty.ShapeColor,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Outline',
    value: SelectedProperty.ShapeOutline,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Text color',
    value: SelectedProperty.ShapeTextColor,
    isShowButton: checkLockedObject,
  },
];

export const ShapeProperties: FC = () => {
  const { setSelectedProperty } = useSelectedProperty();
  const activePhotoObject = useActiveMoveableShapeObject();

  const [photoProperties, setPhotoProperties] = useState(
    SHAPE_PROPERTIES.filter(
      item => activePhotoObject && item.isShowButton(activePhotoObject),
    ),
  );
  const setBackgroundImage = useSetBackgroundImage();

  return (
    <div className="flex gap-1 items-center overflow-x-scroll">
      {photoProperties.map(item => {
        return (
          <Button
            key={item.label}
            onClick={() => {
              if (item.value !== SelectedProperty.ShapeBackground) {
                setSelectedProperty(item.value);
              } else {
                setBackgroundImage();
                setPhotoProperties(
                  SHAPE_PROPERTIES.filter(
                    item =>
                      activePhotoObject && item.isShowButton(activePhotoObject),
                  ),
                );
              }
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
