import {
  useActivePhotoObject,
  useSetBackgroundImage,
} from '@/app/hooks/useActiveMoveableObject';
import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import { MoveablePhoto } from '@/app/lib/moveable/photo/MoveablePhoto';
import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';

const checkLockedObject = (activeObject: MoveableObject) =>
  !activeObject.isLocked;

const PHOTO_MENU_PROPERTIES = [
  {
    label: 'Nudge',
    value: SelectedProperty.PhotoNudge,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Filter',
    value: SelectedProperty.PhotoFilter,
    isShowButton: checkLockedObject,
  },
  {
    label: 'ManualFilter',
    value: SelectedProperty.PhotoManualFilter,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Effect',
    value: SelectedProperty.PhotoEffect,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Crop',
    value: SelectedProperty.PhotoCrop,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Opacity',
    value: SelectedProperty.PhotoOpacity,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Align',
    value: SelectedProperty.PhotoAlign,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Order',
    value: SelectedProperty.Position,
    isShowButton: () => true,
  },
  {
    label: 'Flip',
    value: SelectedProperty.PhotoFlip,
    isShowButton: checkLockedObject,
  },
  {
    label: 'Layer',
    value: SelectedProperty.PhotoLayer,
    isShowButton: () => true,
  },
  {
    label: 'Set as background',
    value: SelectedProperty.PhotoBackground,
    isShowButton: (activeObject: MoveablePhoto) =>
      checkLockedObject(activeObject) && !activeObject.isBackground,
  },
  {
    label: 'Reset background',
    value: SelectedProperty.PhotoBackground,
    isShowButton: (activeObject: MoveablePhoto) => {
      console.log('checkshowbutton', activeObject.isBackground);
      return checkLockedObject(activeObject) && activeObject.isBackground;
    },
  },
  {
    label: 'More',
    value: SelectedProperty.PhotoMore,
    isShowButton: () => true,
  },
];

export const PhotoMenuProperties: FC = () => {
  const { setSelectedProperty } = useSelectedProperty();
  const activePhotoObject = useActivePhotoObject();

  const [photoProperties, setPhotoProperties] = useState(
    PHOTO_MENU_PROPERTIES.filter(
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
              if (item.value !== SelectedProperty.PhotoBackground) {
                setSelectedProperty(item.value);
              } else {
                setBackgroundImage();
                setPhotoProperties(
                  PHOTO_MENU_PROPERTIES.filter(
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
