import {  PHOTO_FILTERS } from '@/app/lib/moveable/constant/photo';
import { useActiveMoveablePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { twMerge } from '@/app/utilities/tailwind';
import Image from 'next/image';
import { FC, useState } from 'react';
import { PhotoFilter } from '@/app/lib/moveable/photo/filters/PhotoFilter';

export const FiltersProperty: FC = () => {
  const photo = useActiveMoveablePhotoObject();
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilter | undefined>(
    photo?.filter,
  );

  if (!photo) return null;

  return (
    <div className="grid w-full grid-cols-4 gap-3">
      {PHOTO_FILTERS.map(filter => (
        <button
          onClick={() => {
            photo?.setFilter(filter);
            setSelectedFilter(photo.filter);
          }}
          key={filter.filterId}
          className="relative cursor-pointer"
        >
          <div
            className={twMerge(
              'relative w-full h-auto aspect-square rounded-md overflow-hidden',
              {
                'border-green-500 border-[3px] border-solid': filter.filterId === selectedFilter?.filterId,
              },
            )}
          >
            <Image
              alt={filter.name}
              src={filter.thumbnail}
              fill
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-md mt-[3px]">{filter.name}</p>
        </button>
      ))}
    </div>
  );
};
