'use client';

import { FC, HTMLAttributes } from 'react';
import { Template } from '@/app/services/template/template';
import { useDrag } from 'react-dnd';

interface TemplateItemProps extends HTMLAttributes<HTMLImageElement> {
  template: Template;
}

export const TemplateItem: FC<TemplateItemProps> = ({ template, ...rest }) => {
  const loadTemplate = () => {};

  const [{}, drag] = useDrag(
    () => ({
      type: 'template',
      item: template,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<Template>();
        if (item && dropResult) {
          loadTemplate();
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [template],
  );

  return (
    <button ref={drag} onClick={loadTemplate}>
      <img src={template.thumbnail} alt="template thumbnail" {...rest} />
    </button>
  );
};
