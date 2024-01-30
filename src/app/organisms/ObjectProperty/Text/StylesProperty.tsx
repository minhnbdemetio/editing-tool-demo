import { useChangeMoveableTextStylesCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Check } from '@/app/icons';
import { Document } from '@/app/icons/Document';
import { TextVarient } from '@/app/lib/moveable/constant/text';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { FC, useEffect, useState } from 'react';

interface FontPropertyProps {}
const stylesArray: { id: TextVarient; title: string; style: any }[] = [
  {
    title: 'Tiêu đề',
    id: TextVarient.HEADING,
    style: {
      fontWeight: '700',
      fontStyle: 'normal',
      color: 'rgb(0, 0, 0)',
      textDecoration: 'none',
      fontSize: '30px',
    },
  },
  {
    title: 'Tiêu đề phụ',
    id: TextVarient.SUBHEADING,
    style: {
      fontWeight: '700',
      fontStyle: 'normal',
      color: 'rgb(0, 0, 0)',
      textDecoration: 'none',
      fontSize: '18px',
    },
  },
  {
    title: 'Nội dung',
    id: TextVarient.BODY,
    style: {
      fontWeight: '400',
      fontStyle: 'normal',
      color: 'rgb(0, 0, 0)',
      textDecoration: 'none',
      fontSize: '12px',
      fontFamily: '"YAFdJllHsUM 0"',
    },
  },
];

export const StylesProperty: FC<FontPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const handleChangeStyles = useChangeMoveableTextStylesCommand();
  const [activeStyle, setActiveStyles] = useState<TextVarient>(
    activeText?.getTextStyle() || TextVarient.HEADING,
  );

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
            onClick={() =>
              handleChangeStyles(item.id, () => setActiveStyles(item.id))
            }
          >
            <span style={item.style}>{item.title}</span>
            <div>{activeStyle === item.id && <Check className="mr-3" />}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
