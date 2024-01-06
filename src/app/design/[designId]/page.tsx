'use client';

import { Editor } from '@/app/organisms/Editor';
import { Menu } from '@/app/organisms/Menu';
import { SvgLine, SvgLineAdornnment } from '@/app/utilities/svg-line';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function DesignDetail() {
  const svgLine = new SvgLine();
  svgLine.setStartAdornment(SvgLineAdornnment.OutlinedTriangle);
  svgLine.setEndAdornment(SvgLineAdornnment.OutlinedTriangle);

  console.debug(svgLine.toSvg());
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex desktop:flex-row">
        <Menu />
        <div className=" flex-auto overflow-auto relative z-0">
          <Editor />
        </div>
      </div>
    </DndProvider>
  );
}
