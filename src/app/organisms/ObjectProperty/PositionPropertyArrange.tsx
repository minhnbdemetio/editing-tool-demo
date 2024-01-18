import { FC } from 'react';
import { GoToTop, MoveOn } from '@/app/icons';
import { useActivePage } from '@/app/store/active-page';
import { usePageObjectsById } from '@/app/hooks/usePageObjects';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';

interface PositionPropertyProps {}

export const PositionPropertyArrange: FC<PositionPropertyProps> = ({}) => {
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  const { activeMoveableObject } = useActiveMoveableObject();
  const activeObjectIndex = () => {
    if (pageObjects && activeMoveableObject) {
      return pageObjects.indexOf(activeMoveableObject);
    }
    return 0;
  };
  const pageObjectsLength = () => {
    if (pageObjects) {
      return pageObjects.length;
    }
    return 0;
  };

  const handleChangeIndex = (index: number) => {
    if (pageObjects && setPageObjects && activeMoveableObject) {
      const newPageObjects = [...pageObjects];
      newPageObjects.splice(activeObjectIndex(), 1);
      newPageObjects.splice(index, 0, activeMoveableObject);
      setPageObjects(newPageObjects);
    }
  };
  return (
    <div className="w-full flex-1">
      <div className="flex w-full">
        <div
          className={`w-1/2 flex h-10 items-center cursor-pointer ${
            activeObjectIndex() === pageObjectsLength() - 1 &&
            'opacity-65	pointer-events-none'
          }`}
          onClick={() => {
            handleChangeIndex(activeObjectIndex() + 1);
          }}
        >
          <MoveOn className="mx-4" />
          Tiến lên 1 lớp
        </div>
        <div
          className={`w-1/2 flex h-10 items-center cursor-pointer ${
            !activeObjectIndex() && 'opacity-65	pointer-events-none'
          }`}
          onClick={() => {
            handleChangeIndex(activeObjectIndex() - 1);
          }}
        >
          <MoveOn className="mx-4 rotate-180" /> Lùi 1 lớp
        </div>
      </div>
      <div className="flex w-full">
        <div
          className={`w-1/2 flex h-10 items-center cursor-pointer ${
            activeObjectIndex() === pageObjectsLength() - 1 &&
            'opacity-65	pointer-events-none'
          }`}
          onClick={() => {
            handleChangeIndex(pageObjectsLength() - 1);
          }}
        >
          <GoToTop className="mx-4" />
          Lên trước
        </div>
        <div
          className={`w-1/2 flex h-10 items-center cursor-pointer ${
            !activeObjectIndex() && 'opacity-65	pointer-events-none'
          }`}
          onClick={() => {
            handleChangeIndex(0);
          }}
        >
          <GoToTop className="mx-4 rotate-180" /> Về sau
        </div>
      </div>
    </div>
  );
};
