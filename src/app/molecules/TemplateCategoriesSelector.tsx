import { FC } from 'react';
import { TemplateCategory } from '@/app/services/template/template';
import { Accordion, AccordionItem } from '@nextui-org/react';

interface TemplateCategoryProps {
  categories: TemplateCategory[];
  onSelectCategory: (categoryName: string) => any;
}

export const TemplateCategorySelector: FC<TemplateCategoryProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <>
      <Accordion className="px-0 h-full min-h-0 overflow-y-scroll">
        {categories.map(category => (
          <AccordionItem
            className="accordion__item"
            key={category.title}
            title={category.title}
          >
            <ul>
              {category.subCategories?.map(subCategory => (
                <li key={subCategory.title}>
                  <button
                    className="w-full text-left h-10"
                    onClick={() => onSelectCategory(subCategory.title)}
                  >
                    {subCategory.title}
                  </button>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
