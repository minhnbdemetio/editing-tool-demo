'use client';

import { Editor } from '@/app/organisms/Editor';
import { Menu } from '@/app/organisms/Menu';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function DesignDetail() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex desktop:flex-row">
        <Menu />
        <div className=" flex-auto overflow-auto">
          <Editor />
        </div>
      </div>
    </DndProvider>
  );
}
