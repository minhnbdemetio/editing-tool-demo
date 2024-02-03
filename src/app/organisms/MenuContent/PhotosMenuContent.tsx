import { Button } from '@/app/atoms/Button';
import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveablePhoto } from '@/app/lib/moveable/photo/MoveablePhoto';
import { FC } from 'react';

export const PhotosMenuContent: FC = () => {
  const addObjectToPage = useAddObjectToActivePage();
  const handleAddPhoto = () => {
    addObjectToPage(
      new MoveablePhoto(
        'https://thumbs.dreamstime.com/b/woman-praying-free-birds-to-nature-sunset-background-woman-praying-free-birds-enjoying-nature-sunset-99680945.jpg',
      ),
    );
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <Button onClick={handleAddPhoto} className="w-full" color="primary">
        Add a photo
      </Button>
    </div>
  );
};
