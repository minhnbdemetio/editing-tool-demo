import { FC } from 'react';
import { TemplateSlideshow } from './TemplateCarousel';
import { TemplateCategory } from '@/app/services/template/template';

interface TemplateCategoriesProps {
  categories: TemplateCategory[];
  showAllCategoryTemplates: (categoryName: string) => any;
}

export const TemplateCategories: FC<TemplateCategoriesProps> = ({
  showAllCategoryTemplates,
  categories,
}) => {
  return (
    <>
      <div className="overflow-x-hidden mx-2 overflow-y-scroll">
        {categories.map(category => (
          <TemplateSlideshow
            category={category}
            handleShowAll={() => showAllCategoryTemplates(category.title)}
            key={category.title}
          />
        ))}
      </div>
    </>
  );
};
