'use client';

import React, { FC } from 'react';
import { TemplateCategory } from '@/app/services/template/template';
import { TemplateItem } from './TemplateItem';
import { Button } from '@nextui-org/react';
import { generateRandomString } from '../utilities/string';
import { Slideshow } from '../atoms/Slider';

export interface TemplateCarouselProps {
  category: TemplateCategory;
  handleShowAll: any;
}

export const TemplateCarousel: FC<TemplateCarouselProps> = ({
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
      <Slideshow>
        {category.templates?.map(template => (
          <TemplateItem key={generateRandomString(5)} template={template} />
        ))}
      </Slideshow>
    </div>
  );
};
