import { FC } from 'react';
import { Template } from '../services/templates/types';

export interface TemplateListProps {
  templates: Template[];
}

export const TemplateList: FC<TemplateListProps> = ({ templates }) => {
  return (
    <div className="overflow-auto">
      <ul className="grid grid-cols-3 gap-2">
        {templates.map(template => (
          <li key={template.thumbnail} className="relative">
            <img alt="template thumbnail" src={template.thumbnail} />
          </li>
        ))}
      </ul>
    </div>
  );
};
