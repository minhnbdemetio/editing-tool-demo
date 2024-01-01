import { FC } from 'react';
import { TemplateItem } from './TemplateItem';
import { Template } from '../services/template/template';
import { generateRandomString } from '../utilities/string';

export interface TemplateListProps {
  templates: Template[];
}

export const TemplateList: FC<TemplateListProps> = ({ templates }) => {
  return (
    <div className="overflow-y-scroll">
      <ul className="grid grid-cols-3 gap-2">
        {templates.map(template => (
          <li key={generateRandomString(5)} className="relative">
            <TemplateItem template={template} />
          </li>
        ))}
      </ul>
    </div>
  );
};
