'use client';

import React, { FC } from 'react';
import Slider from 'react-slick';
import { TemplateCategory } from '@/app/services/template/template';
import { TemplateItem } from './TemplateItem';
import { Button } from '@nextui-org/react';
import { Next, Prev } from '@/app/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { DraggableItem } from '../atoms/DraggableItem';

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
      <Swiper
        slidesPerView={2}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {category.templates?.map((template, index) => (
          <DraggableItem
            key={template.thumbnail + index}
            onDrop={() => {}}
            type="template"
          >
            <SwiperSlide>
              <TemplateItem template={template} />
            </SwiperSlide>
          </DraggableItem>
        ))}
      </Swiper>
      {/* <Slider
        slidesToShow={2}
        prevArrow={
          <Button
            className="z-30"
            size="sm"
            isIconOnly
            color="primary"
            variant="faded"
          >
            <Prev className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        }
        nextArrow={
          <Button
            className="z-30"
            size="sm"
            isIconOnly
            color="primary"
            variant="faded"
          >
            <Next className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        }
      >
        {category.templates?.map(template => (
          <div key={template.thumbnail}>
            <TemplateItem template={template} />
          </div>
        ))}
      </Slider> */}
    </div>
  );
};
