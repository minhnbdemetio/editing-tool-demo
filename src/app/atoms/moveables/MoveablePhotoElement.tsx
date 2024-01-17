import { MoveablePhoto } from '@/app/factories/MoveablePhoto';
import { FC } from 'react';

interface MoveablePhotoProps {
  object: MoveablePhoto;
}

export const MoveablePhotoElement: FC<MoveablePhotoProps> = ({ object }) => {
  return (
    <div id={object.id} className={`hidden absolute`}>
      <img className="w-full h-full " src={object.src} alt="some image" />
    </div>
  );
};
