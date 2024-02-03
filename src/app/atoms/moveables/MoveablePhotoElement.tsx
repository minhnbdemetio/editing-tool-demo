import { IMAGE_CONTAINER } from '@/app/lib/moveable/constant/image';
import { OBJECT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/object';
import { PHOTO_INNER_ELEMENTS } from '@/app/lib/moveable/constant/photo';
import { MoveablePhoto } from '@/app/lib/moveable/photo/MoveablePhoto';
import { FC } from 'react';

interface MoveablePhotoProps {
  object: MoveablePhoto;
}

export const MoveablePhotoElement: FC<MoveablePhotoProps> = ({ object }) => {
  return (
    <div
      data-id={object.id}
      id={object.id}
      style={{
        width: object.width,
        height: object.height,
      }}
      className={` absolute w-fit overflow-hidden`}
    >
      <div
        className="w-full h-full"
        id={`${OBJECT_INNER_ELEMENTS.FLIPPER}-${object.id}`}
      >
        <div
          id={`${PHOTO_INNER_ELEMENTS.IMAGE_LAYER}-${object.id}`}
          className="w-full h-full"
        >
          <svg
            id={`${PHOTO_INNER_ELEMENTS.SVG}-${object.id}`}
            width={'100%'}
            height={'100%'}
            className="w-full h-full"
          >
            <defs id={`${PHOTO_INNER_ELEMENTS.DEFS}-${object.id}`}>
              <filter
                colorInterpolationFilters="sRGB"
                id={object.filter.filterId}
              ></filter>
            </defs>
            <g id={`${PHOTO_INNER_ELEMENTS.G}-${object.id}`}>
              <image
                id={`${IMAGE_CONTAINER}-${object.id}`}
                className="w-full h-full"
                width={'100%'}
                height={'100%'}
                href={object.src}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
