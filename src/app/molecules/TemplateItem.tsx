'use client';

import { FC, HTMLAttributes } from 'react';
import { Template } from '@/app/services/template/template';
import { useActivePageCanvas } from '../hooks/useActivePage';
import { useDrag } from 'react-dnd';
import { SwiperSlide } from 'swiper/react';

interface TemplateItemProps extends HTMLAttributes<HTMLImageElement> {
  template: Template;
}

export const TemplateItem: FC<TemplateItemProps> = ({ template, ...rest }) => {
  const activePageCanvas = useActivePageCanvas();

  const loadTemplate = () => {
    activePageCanvas?.loadFromJSON(template.data, () =>
      activePageCanvas.renderAll(),
    );
  };

  // const [{}, drag] = useDrag(
  //   () => ({
  //     type: 'template',
  //     item: template,
  //     end: (item, monitor) => {
  //       const dropResult = monitor.getDropResult<Template>();
  //       if (item && dropResult) {
  //         loadTemplate();
  //       }
  //     },
  //     collect: monitor => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   }),
  //   [template, activePageCanvas],
  // );

  return (
    <button onClick={loadTemplate}>
      <img src={template.thumbnail} alt="template thumbnail" {...rest} />
    </button>
  );
};
