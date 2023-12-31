'use client';

import React, { FC } from 'react';
import Slider from 'react-slick';
import { TemplateCategory } from '@/app/services/template/template';
import { TemplateItem } from './TemplateItem';
import { Button } from '@nextui-org/react';
import { Next, Prev } from '@/app/icons';

export interface TemplateSlideshowProps {
  category: TemplateCategory;
  handleShowAll: any;
}

export const TemplateSlideshow: FC<TemplateSlideshowProps> = ({
  category,
  handleShowAll,
}) => {
  return (
    <div>
      <span className="text-[#70798f] text-md cursor-default">
        {category.title}
      </span>
      <div className="text-right">
        <Button className="bg-transparent text-primary" onClick={handleShowAll}>
          Show all
        </Button>
      </div>
      <Slider
        arrows
        slidesToShow={2}
        prevArrow={
          <Button size="sm" isIconOnly color="primary" variant="faded">
            <Prev className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        }
        nextArrow={
          <Button size="sm" isIconOnly color="primary" variant="faded">
            <Next className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        }
      >
        {category.templates?.map(template => (
          <div key={template.thumbnail}>
            <TemplateItem template={template} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
