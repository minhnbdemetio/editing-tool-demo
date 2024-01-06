'use client';

import { FC } from 'react';
import { Button } from '../atoms/Button';
import { EditablePage } from './EditablePage';
import { useEditablePages } from '../store/editable-pages';
import { LinePreviewToggle } from '../molecules/LinePreviewToggle';
import { useDrop } from 'react-dnd';

export const Editor: FC = () => {
  const { pages, addBlankPage } = useEditablePages();

  const handleAddPage = () => {
    const randomId = new Date().getTime();
    addBlankPage(randomId + '');
  };

  const [{}, drop] = useDrop(() => ({
    accept: 'template',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} id="editor-container" className="bg-gray-200 p-10">
      <div className="text-right mb-3">
        <LinePreviewToggle />
      </div>
      <div className="flex flex-col gap-10 h-full">
        {Object.entries(pages).map(([pageId]) => (
          <div key={pageId}>
            <EditablePage pageId={pageId} />
          </div>
        ))}
      </div>
      <Button className="mt-10" onClick={handleAddPage}>
        +Add page
      </Button>
    </div>
  );
};
