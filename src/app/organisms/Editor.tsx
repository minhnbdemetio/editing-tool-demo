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
import { MoveablePhoto } from '../lib/moveable/photo/MoveablePhoto';
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
        'data:image/png;base64,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',
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
