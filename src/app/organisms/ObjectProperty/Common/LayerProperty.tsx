import { FC, useState, useCallback } from 'react';
import { usePageObjectsById } from '@/app/hooks/usePageObjects';
import { LayerRender } from '@/app/molecules/LayerRender';
import { useActivePage } from '@/app/store/active-page';
import { useDesign } from '@/app/store/design-objects';
import { Button } from '@nextui-org/react';
import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import { CardDrag } from '@/app/molecules/CardDrag';

interface LayerPropertyProps {}
enum MODE {
  'all',
  'override',
}
export const LayerProperty: FC<LayerPropertyProps> = ({}) => {
  const [mode, setMode] = useState<MODE>(MODE.all);
  const { activePage } = useActivePage();
  const { moveableTargets } = useDesign();

  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  const [isChoose, setIsChoose] = useState<boolean>(false);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newPageObjects = [...(pageObjects || [])];
      const dragCard = newPageObjects[dragIndex];
      newPageObjects.splice(dragIndex, 1);
      newPageObjects.splice(hoverIndex, 0, dragCard);
      if (newPageObjects && setPageObjects) {
        setPageObjects([...newPageObjects]);
      }
    },
    [pageObjects, setPageObjects],
  );

  const renderCard = useCallback(
    (pageObject: MoveableObject, index: number) => {
      return (
        <CardDrag
          key={pageObject.id}
          index={index}
          id={pageObject.id}
          render={
            <LayerRender
              key={pageObject.id}
              pageObject={pageObject}
              isChosen={isChoose}
            />
          }
          moveCard={moveCard}
        />
      );
    },
    [isChoose, moveCard],
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="m-1 flex w-full justify-between items-center">
        <Button
          className="w-10"
          color="primary"
          variant="light"
          onClick={() => {
            setIsChoose(!isChoose);
          }}
        >
          {isChoose ? 'Xong' : 'Chọn'}
        </Button>
        <span>
          {isChoose ? `Đã chọn ${moveableTargets.length} lớp` : 'Lớp'}
        </span>
        <span className="w-20 h-1"></span>
      </div>
      <div className="w-full h-10 border border-[#2b3b4a4d] rounded flex">
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.all && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.all)}
        >
          Tất cả
        </div>
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.override && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.override)}
        >
          Đè lên nhau
        </div>
      </div>
      {mode === MODE.all && (
        <ul className="h-[calc(30vh-90px)] w-full overflow-auto">
          {pageObjects &&
            pageObjects.map((pageObject, index) =>
              renderCard(pageObject, index),
            )}
        </ul>
      )}
    </div>
  );
};
