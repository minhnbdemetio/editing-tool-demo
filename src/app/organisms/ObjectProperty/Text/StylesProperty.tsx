import { useChangeMoveableTextStylesCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { Check } from '@/app/icons';
import { Document } from '@/app/icons/Document';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { cssStringToObject } from '@/app/utilities/utils';
import { FC, useEffect, useState } from 'react';

interface FontPropertyProps {}

const stylesArray = [
  {
    title: 'Tiêu đề',
    id: 'heading',
    style:
      'font-weight: 700; font-style: normal; color: rgb(0, 0, 0); text-decoration: none; font-size: 30px;',
  },
  {
    title: 'Tiêu đề phụ',
    id: 'heading2',
    style:
      'font-weight: 700; font-style: normal; color: rgb(0, 0, 0); text-decoration: none; font-size: 18px',
  },
  {
    title: 'Nội dung',
    id: 'content',
    style:
      'font-weight: 400; font-style: normal; color: rgb(0, 0, 0); text-decoration: none; font-size: 12px; font-family: "YAFdJllHsUM 0"',
  },
];

export const StylesProperty: FC<FontPropertyProps> = ({}) => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const handleChangeStyles = useChangeMoveableTextStylesCommand();
  const [activeStyle, setActiveStyles] = useState<string>('');
  const activeElement = activeMoveableObject?.getElement();

  useEffect(() => {
    if (activeElement) {
      setActiveStyles(activeElement?.getAttribute('stylesId') || '');
    }
  }, [activeElement]);

  const handleChangeStyle = (style: string, id: string) => {
    handleChangeStyles(cssStringToObject(style), id, () => {
      setActiveStyles(id);
    });
  };

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <span>Kiểu văn bản</span>
      </div>
      <div className="flex text-center items-center">
        <Document />
        <h5 className="pl-1 ml-1">Các kiểu tài liệu</h5>
      </div>
      <ul className="">
        {stylesArray.map(item => (
          <li
            key={item.id}
            className="my-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
            onClick={() => handleChangeStyle(item.style, item.id)}
          >
            <span style={cssStringToObject(item.style)}>{item.title}</span>
            <div>{activeStyle === item.id && <Check className="mr-3" />}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
