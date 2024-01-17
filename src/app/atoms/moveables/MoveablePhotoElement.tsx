import { MoveablePhoto } from '@/app/factories/MoveablePhoto';
import { FC, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface MoveablePhotoProps {
  object: MoveablePhoto;
}

export const MoveablePhotoElement: FC<MoveablePhotoProps> = ({ object }) => {
  const id = uuid();

  return (
    <div
      data-id={object.id}
      id={object.id}
      style={{
        width: object.width,
        height: object.height,
      }}
      className={`hidden absolute w-fit`}
    >
      <svg width={'100%'} height={'100%'} className="w-full h-full">
        <defs>
          <filter id={object.filterId}></filter>
        </defs>
        <g>
          <image
            className="w-full h-full"
            width={'100%'}
            height={'100%'}
            href={object.src}
          />
        </g>
      </svg>
    </div>
  );
};
