import { MoveablePhoto } from '@/app/factories/MoveablePhoto';
import { FC, useEffect, useState } from 'react';

interface MoveablePhotoProps {
  object: MoveablePhoto;
}

export const MoveablePhotoElement: FC<MoveablePhotoProps> = ({ object }) => {
  return (
    <div
      id={object.id}
      style={{
        width: object.width,
        height: object.height,
      }}
      className={`hidden absolute w-fit`}
    >
      <svg width={'100%'} height={'100%'} className="w-full h-full">
        <image
          className="w-full h-full"
          width={'100%'}
          height={'100%'}
          href={object.src}
        />
      </svg>
    </div>
  );
};
