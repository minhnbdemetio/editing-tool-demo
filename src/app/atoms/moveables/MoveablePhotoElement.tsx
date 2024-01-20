import { IMAGE_CONTAINER } from "@/app/lib/moveable/constant/image";
import { MoveablePhoto } from '@/app/lib/moveable/MoveablePhoto';
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
      className={`hidden absolute w-fit overflow-hidden`}
    >
      <div id={`image-layer-${object.id}`} className="w-full h-full">
        <svg
          id={`svg-container-${object.id}`}
          width={'100%'}
          height={'100%'}
          className="w-full h-full"
        >
          <defs id={`defs-${object.id}`}>
            <filter
              colorInterpolationFilters="sRGB"
              id={object.filterId}
            ></filter>
          </defs>
          <g id={`g-${object.id}`}>
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
  );
};
