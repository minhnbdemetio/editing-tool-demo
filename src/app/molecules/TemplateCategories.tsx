import { FC } from 'react';
import SliderShow from './SliderShow';
import { SliderItem } from './SliderShow/sliderShow';
import { useActivePageCanvas } from '../hooks/useActivePage';
import { fabric } from 'fabric';

const recentlyUsed: SliderItem[] = [
  {
    key: 'id001',
    url: 'https://shorturl.at/opuxU',
  },
  {
    key: 'id002',
    url: 'https://shorturl.at/tKORW',
  },
  {
    key: 'id003',
    url: 'https://shorturl.at/GQXY4',
  },
  {
    key: 'id004',
    url: 'https://shorturl.at/hmW27',
  },
  {
    key: 'id005',
    url: 'https://shorturl.at/dKNY0',
  },
  {
    key: 'id006',
    url: 'https://shorturl.at/opuxU',
  },
  {
    key: 'id007',
    url: 'https://shorturl.at/tKORW',
  },
  {
    key: 'id008',
    url: 'https://shorturl.at/GQXY4',
  },
  {
    key: 'id009',
    url: 'https://shorturl.at/hmW27',
  },
  {
    key: 'id0010',
    url: 'https://shorturl.at/dKNY0',
  },
];

interface TemplateCategoriesProps {
  showAllCategoryTemplates: (categoryName: string) => any;
}

export const TemplateCategories: FC<TemplateCategoriesProps> = ({
  showAllCategoryTemplates,
}) => {
  const activePageCanvas = useActivePageCanvas();

  const handleAddPhoto = (item: SliderItem) => {
    fabric.Image.fromURL(item.url, image => activePageCanvas?.add(image), {
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
      scaleX: 0.1,
      scaleY: 0.1,
    });
  };
  return (
    <>
      <div className="w-[360] mx-2 overflow-y-scroll">
        <SliderShow
          handleShowAll={() => showAllCategoryTemplates('Recently Used')}
          items={recentlyUsed}
          title="Recently Used"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          handleShowAll={() => showAllCategoryTemplates('Medic')}
          items={recentlyUsed}
          title="Medic"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          handleShowAll={() => showAllCategoryTemplates('Wedding')}
          items={recentlyUsed}
          title="Wedding"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          handleShowAll={() => showAllCategoryTemplates('Super Bowl')}
          items={recentlyUsed}
          title="Super Bowl"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          handleShowAll={() => showAllCategoryTemplates('Cute')}
          items={recentlyUsed}
          title="Cute"
          handleClickItem={handleAddPhoto}
        />
      </div>
    </>
  );
};
