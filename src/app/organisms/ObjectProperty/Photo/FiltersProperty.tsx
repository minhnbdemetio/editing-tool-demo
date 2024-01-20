import { FILTERS } from '@/app/constants/photo-filters';
import { useActiveMoveablePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { PhotoFilter } from '@/app/types';
import { isEqual } from '@/app/utilities/photo';
import { twMerge } from '@/app/utilities/tailwind';
import Image from 'next/image';
import { FC, useState } from 'react';

export const FiltersProperty: FC = () => {
  const photo = useActiveMoveablePhotoObject();
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilter | undefined>(
    photo?.getFilterParam(),
  );

  if (!photo) return null;

  return (
    <div className="grid w-full grid-cols-4 gap-3">
      {FILTERS.map(filter => (
        <div
          onClick={() => {
            photo?.setFilter(filter.setup);
            setSelectedFilter(photo.getFilterParam());
          }}
          key={filter.id}
          className="relative cursor-pointer"
        >
          <div
            className={twMerge(
              'relative w-full h-auto aspect-square rounded-md overflow-hidden',
              {
                'border-green-500 border-[3px] border-solid': isEqual(
                  filter.setup,
                  selectedFilter as PhotoFilter,
                ),
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
        </div>
      ))}
    </div>
  );
};
