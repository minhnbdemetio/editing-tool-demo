import { Button } from '@/app/atoms/Button';
import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveablePhoto } from '@/app/lib/moveable/photo/MoveablePhoto';
import { FC } from 'react';

export const PhotosMenuContent: FC = () => {
  const addObjectToPage = useAddObjectToActivePage();
  const handleAddPhoto = () => {
    addObjectToPage(
      new MoveablePhoto(
        'https://iso.500px.com/wp-content/uploads/2015/05/inna_cover.jpeg',
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
