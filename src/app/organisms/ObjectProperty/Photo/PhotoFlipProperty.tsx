import { ObjectFlip } from '@/app/factories/MoveableObject';
import { useActiveMoveablePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { twMerge } from '@/app/utilities/tailwind';
import { FC } from 'react';

export const PhotoFlipProperty: FC = () => {
  const photo = useActiveMoveablePhotoObject();

  if (!photo) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              photo.flip(ObjectFlip.HORIZONTAL);
            }}
            className={twMerge(
              'border-[1px] border-solid border-gray-500 rounded-md px-3 py-3',
            )}
          >
            Flip horizontal
          </button>
          <button
            onClick={() => {
              photo.flip(ObjectFlip.VERTICAL);
            }}
            className={twMerge(
              'border-[1px] border-solid border-gray-500 rounded-md px-3 py-3',
            )}
          >
            Flip vertical
          </button>
        </div>
      </div>
    </>
  );
};