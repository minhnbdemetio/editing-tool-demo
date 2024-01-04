import { FC } from 'react';
import { TemplateCarousel } from './TemplateCarousel';
import { TemplateCategory } from '@/app/services/template/template';
import { generateRandomString } from '../utilities/string';

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
          <TemplateCarousel
            category={category}
            handleShowAll={() => showAllCategoryTemplates(category.title)}
            key={generateRandomString(5)}
          />
        ))}
      </div>
    </>
  );
};
