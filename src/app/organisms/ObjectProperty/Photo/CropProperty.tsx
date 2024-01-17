import { PhotoPosition } from '@/app/factories/MoveablePhoto';
import { useActivePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { useOutsideClick } from '@/app/hooks/useClickOutside';
import clsx from 'clsx';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
type CropIconProps = {
  className?: string;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
};

const CropIcon: FC<CropIconProps> = ({ className = '', onMouseDown }) => {
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
      onMouseDown={onMouseDown}
    ></div>
  );
};

export const PhotoCropProperty: FC = () => {
  const el = document.createElement('div');
  const activeObject = useActivePhotoObject();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();
  const [photoPosition, setPhotoPosition] = useState<PhotoPosition | undefined>(
    activeObject?.getPhotoPosition(),
  );
  const [cropPosition, setCropPosition] = useState<PhotoPosition | undefined>(
    activeObject?.getPhotoPosition(),
  );
  const [direction, setDirection] = useState<string | undefined>(undefined);

  useEffect(() => {
    el.className = 'photo-crop-property';
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    // console.log('activeObject', activeObject);
    // setPhotoPosition(activeObject?.getPhotoPosition());
  }, []);

  const handleMouseDown = (e: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!direction || !cropPosition) return;
    const { clientX, clientY } = e as MouseEvent;
    let newPosition: PhotoPosition | undefined = undefined;
    switch (direction) {
      case 'tl':
        newPosition = {
          x: clientX + cropPosition.x,
          y: clientY + cropPosition.y,
          width: cropPosition.width - clientX,
          height: cropPosition.height - clientY,
        };
        break;
      case 'tr':
        newPosition = {
          x: cropPosition.x,
          y: clientY + cropPosition.y,
          width: clientX,
          height: cropPosition.height - clientY,
        };
        break;
      case 'br':
        newPosition = {
          x: cropPosition.x,
          y: cropPosition.y,
          width: clientX,
          height: clientY,
        };
        break;
      default:
        newPosition = {
          x: clientX + cropPosition.x,
          y: clientY,
          width: cropPosition.width - clientX,
          height: clientY,
        };
        break;
    }
    setTimeoutId(setTimeout(() => {
        console.log(clientX, clientY)
        debugger
        setCropPosition(newPosition)
    }, 100));
  };

  const isCropPositionIsOutOfBound = (
    position: { x: number; y: number },
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

  const CropElement = () => (
    <div
      id={`crop-container-${activeObject?.id}`}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100]"
    >
      <div
        className="absolute opacity-50"
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
          width: `${cropPosition?.width}px`,
          height: `${cropPosition?.height}px`,
          transform: `translate(${cropPosition?.x}px, ${cropPosition?.y}px)`,
        }}
      >
        <img
          className="w-full h-full"
          src={activeObject?.src}
          alt=""
          style={{ objectFit: 'cover', objectPosition: '0 0' }}
        />
      </div>
      <div
        className="absolute"
        style={{
          width: `${cropPosition?.width}px`,
          height: `${cropPosition?.height}px`,
          transform: `translate(${cropPosition?.x}px, ${cropPosition?.y}px)`,
        }}
        onMouseMove={handleMouseDown}
        onMouseUp={() => setDirection(undefined)}
      >
        <CropIcon
          className="t-0 l-0 transform translate-x-[-4px] translate-y-[-4px] rotate-0"
          onMouseDown={() => setDirection('tl')}
          //   onUpdateCropPosition={(val: { x: number; y: number }) =>
          //     hanleUpdateCropPosition(val, 'tl')
          //   }
        />
        <CropIcon
          className="t-0 right-0 transform translate-x-[4px] translate-y-[-4px] rotate-90"
          onMouseDown={() => setDirection('tr')}
        />
        <CropIcon
          className="bottom-0 right-0 transform translate-x-[4px] translate-y-[4px] rotate-180"
          onMouseDown={() => setDirection('br')}
        />
        <CropIcon
          className="bottom-0 l-0 transform translate-x-[-4px] translate-y-[4px] rotate-[270deg]"
          onMouseDown={() => setDirection('bl')}
        />
      </div>
    </div>
  );
  return ReactDOM.createPortal(<CropElement />, el);
};
