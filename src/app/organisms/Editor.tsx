'use client';

import { FC } from 'react';
import { Button } from '../atoms/Button';
import { EditablePage } from './EditablePage';
import { LinePreviewToggle } from '../molecules/LinePreviewToggle';
import { useDrop } from 'react-dnd';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableConfig } from '../atoms/moveables/MoveableConfig';
import { useAddPage, useClonePage, usePages } from '../hooks/usePage';
import { useActivePage } from '../store/active-page';
import { twMerge } from '../utilities/tailwind';
import { MoveablePhoto } from '../factories/MoveablePhoto';
import { useAddObjectToActivePage } from '../hooks/usePageObjects';

export const SELECTO_ID = 'editor-selecto';
export const EDITOR_CONTAINER = 'editor-container';

export const Editor: FC = () => {
  const pages = usePages();
  const addPage = useAddPage();
  const clonePage = useClonePage();
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();

  const handleAddPage = () => {
    addPage([]);
  };
  const handleClonePage = () => {
    clonePage(activePage);
  };

  const [{}, drop] = useDrop(() => ({
    accept: 'template',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const addObjectToPage = useAddObjectToActivePage();

  const handleAddPhoto = () => {
    addObjectToPage(
      new MoveablePhoto(
        'https://iso.500px.com/wp-content/uploads/2015/05/inna_cover.jpeg',
      ),
    );
  };

  return (
    <div
      ref={drop}
      id={EDITOR_CONTAINER}
      data-active-element-type={activeMoveableObject?.type}
      className={`bg-gray-200 p-10 ${EDITOR_CONTAINER}`}
    >
      <div className="text-right mb-3">
        <LinePreviewToggle />
      </div>
      <Button className="mt-10" onClick={handleAddPhoto}>
        +Add photo
      </Button>
      <div className="flex flex-col gap-10 h-full">
        {pages.map(pageId => (
          <div
            className={twMerge('editable-page', {
              'border-cyan-500 border-1': activePage === pageId,
            })}
            key={pageId}
          >
            <EditablePage pageId={pageId} />
          </div>
        ))}
      </div>
      <Button className="mt-10" onClick={handleAddPage}>
        +Add page
      </Button>
      <Button className="mt-10" onClick={handleClonePage}>
        Clone active page
      </Button>
      <MoveableConfig />
    </div>
  );
};
