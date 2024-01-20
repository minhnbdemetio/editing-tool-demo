import { Button } from '@/app/atoms/Button';
import { PhotoPosition } from '@/app/factories/MoveablePhoto';
import {
  useActivePhotoObject,
  useUpdatePhotoPosition,
} from '@/app/hooks/useActiveMoveableObject';
import { useSelectedProperty } from '@/app/store/selected-property';
import clsx from 'clsx';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Moveable from 'react-moveable';
type CropIconProps = {
  className?: string;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onMouseMove?: Function;
};

const CropIcon: FC<CropIconProps> = ({
  className = '',
  onMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  return (
    <div
      className={clsx(
        'absolute w-[22px] h-[22px] t-0 l-0 transform translate-x-[-4px] translate-y-[-4px] rotate-0',
        className,
      )}
      style={{
        background: `url(/crop-resize-handle-lt.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '13px',
      }}
      onMouseDown={() => onMouseDown && onMouseDown()}
      onTouchStart={() => onMouseDown && onMouseDown()}
      onMouseMove={e => onMouseMove && onMouseMove(e)}
      onTouchMove={e => onMouseMove && onMouseMove(e)}
      onMouseUp={() => onMouseUp && onMouseUp()}
      onTouchEnd={() => onMouseUp && onMouseUp()}
    ></div>
  );
};

export const PhotoCropProperty: FC = () => {
  const el =
    document.getElementById('photo-crop-property') ||
    document.createElement('div');
  const activeObject = useActivePhotoObject();
  const { setSelectedProperty } = useSelectedProperty();
  const [photoPosition, setPhotoPosition] = useState<PhotoPosition | undefined>(
    activeObject?.getImagePosition(),
  );

  useEffect(() => {
    el.className = 'photo-crop-property';
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  const handleCropPhoto = useUpdatePhotoPosition();

  const CropElement = () => {
    const [cropPosition, setCropPosition] = useState<PhotoPosition | undefined>(
      activeObject?.cropPosition || activeObject?.getImagePosition(),
    );
    const [direction, setDirection] = useState<string | undefined>(undefined);
    useEffect(() => {
      window.addEventListener('resize', handleResizeWindow);
      return () => {
        window.removeEventListener('resize', handleResizeWindow);
      };
    }, []);

    const handleMouseDown = (e: any) => {
      if (!direction || !cropPosition) return;
      const { clientX, clientY } = e?.touches ? e.touches[0] : e;
      let newPosition: PhotoPosition | undefined = undefined;
      switch (direction) {
        case 'tl':
          newPosition = {
            x: clientX,
            y: clientY,
            width: cropPosition.width - (clientX - cropPosition.x),
            height: cropPosition.height - (clientY - cropPosition.y),
          };
          break;
        case 'tr':
          newPosition = {
            x: cropPosition.x,
            y: clientY,
            width: clientX - cropPosition.x,
            height: cropPosition.height - (clientY - cropPosition.y),
          };
          break;
        case 'br':
          newPosition = {
            x: cropPosition.x,
            y: cropPosition.y,
            width: clientX - cropPosition.x,
            height: clientY - cropPosition.y,
          };
          break;
        case 'bl':
          newPosition = {
            x: clientX,
            y: cropPosition.y,
            width: cropPosition.width - (clientX - cropPosition.x),
            height: clientY - cropPosition.y,
          };
          break;
      }
      if (
        newPosition &&
        photoPosition &&
        !isCropPositionIsOutOfBound(newPosition, photoPosition)
      ) {
        setCropPosition(newPosition);
      }
    };

    const isCropPositionIsOutOfBound = (
      position: PhotoPosition,
      photoPosition: PhotoPosition,
    ) => {
      if (
        position.x > photoPosition.x + photoPosition.width ||
        position.x < photoPosition.x ||
        position.y > photoPosition.y + photoPosition.height ||
        position.y < photoPosition.y
      ) {
        return true;
      }
      return false;
    };

    const handleResizeWindow = () => {
      setPhotoPosition(activeObject?.getImagePosition());
      setCropPosition(
        activeObject?.cropPosition || activeObject?.getImagePosition(),
      );
    };

    return (
      <div
        id={`crop-container-${activeObject?.id}`}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100]"
      >
        <div
          className="absolute"
          style={{
            width: `${photoPosition?.width}px`,
            height: `${photoPosition?.height}px`,
            transform: `translate(${photoPosition?.x}px, ${photoPosition?.y}px)`,
          }}
          id={`crop-image-container-${activeObject?.id}`}
        >
          <img className="w-full h-full" src={activeObject?.src} alt="" />
        </div>
        <div
          className="absolute"
          style={{
            width: `${photoPosition?.width}px`,
            height: `${photoPosition?.height}px`,
            transform: `translate(${photoPosition?.x}px, ${photoPosition?.y}px)`,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        ></div>
        <div
          className="absolute overflow-hidden"
          style={{
            width: `${cropPosition?.width}px`,
            height: `${cropPosition?.height}px`,
            transform: `translate(${cropPosition?.x}px, ${cropPosition?.y}px)`,
          }}
          id={`crop-image-container-${activeObject?.id}`}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              transform: `translate(${photoPosition!.x - cropPosition!.x}px, ${
                photoPosition!.y - cropPosition!.y
              }px)`,
              width: `${photoPosition!.width}px`,
              height: `${photoPosition!.height}px`,
            }}
          >
            <img className="w-full h-full" src={activeObject?.src} alt="" />
          </div>
        </div>
        <div
          className="absolute"
          style={{
            width: `${cropPosition?.width}px`,
            height: `${cropPosition?.height}px`,
            transform: `translate(${cropPosition?.x}px, ${cropPosition?.y}px)`,
            touchAction: 'none',
            resize: 'both',
          }}
          onMouseMove={handleMouseDown}
          onTouchMove={handleMouseDown}
          onMouseUp={() => setDirection(undefined)}
          onTouchEnd={() => setDirection(undefined)}
        >
          <CropIcon
            className="t-0 l-0 transform translate-x-[-4px] translate-y-[-4px] rotate-0 cursor-nwse-resize"
            onMouseDown={() => setDirection('tl')}
          />
          <CropIcon
            className="t-0 right-0 transform translate-x-[4px] translate-y-[-4px] rotate-90 cursor-nesw-resize"
            onMouseDown={() => setDirection('tr')}
          />
          <CropIcon
            className="bottom-0 right-0 transform translate-x-[4px] translate-y-[4px] rotate-180 cursor-nwse-resize"
            onMouseDown={() => setDirection('br')}
          />
          <CropIcon
            className="bottom-0 l-0 transform translate-x-[-4px] translate-y-[4px] rotate-[270deg] cursor-nesw-resize"
            onMouseDown={() => setDirection('bl')}
          />
        </div>
        <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button
            className="w-[64px]"
            onClick={() => setSelectedProperty(null)}
            isIconOnly
          >
            Cancel
          </Button>
          <Button
            className="w-[64px]"
            onClick={() =>
              handleCropPhoto(
                cropPosition as PhotoPosition,
                photoPosition as PhotoPosition,
                () => setSelectedProperty(null),
              )
            }
            isIconOnly
          >
            Crop
          </Button>
        </div>
      </div>
    );
  };
  return ReactDOM.createPortal(<CropElement />, el);
};
