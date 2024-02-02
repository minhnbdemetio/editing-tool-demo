import { useChangeMoveableTextStylesCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Check } from '@/app/icons';
import { Document } from '@/app/icons/Document';
import { TextVariant } from '@/app/lib/moveable/constant/text';
import { MoveableBodyTextObject } from '@/app/lib/moveable/text/MoveableBodyText';
import { MoveableHeadingTextObject } from '@/app/lib/moveable/text/MoveableHeadingText';
import { MoveableSubheadingTextObject } from '@/app/lib/moveable/text/MoveableSubheadingText';
import { MoveableTextObject } from '@/app/lib/moveable/text/MoveableText';
import { FC, useState } from 'react';

interface FontPropertyProps {}
const stylesArray: {
  title: string;
  style: MoveableTextObject;
}[] = [
  {
    title: 'Tiêu đề',
    style: new MoveableHeadingTextObject(),
  },
  {
    title: 'Tiêu đề phụ',
    style: new MoveableSubheadingTextObject(),
  },
  {
    title: 'Nội dung',
    style: new MoveableBodyTextObject(),
  },
];

export const StylesProperty: FC<FontPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const handleChangeStyles = useChangeMoveableTextStylesCommand();
  const [activeStyle, setActiveStyles] = useState<TextVariant | undefined>();

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <span>Kiểu văn bản</span>
      </div>
      <div className="flex text-center items-center">
        <Document />
        <h5 className="pl-1 ml-1">Text styles</h5>
      </div>
      <ul className="">
        {stylesArray.map(item => (
          <li
            key={item.style.variant}
            className="my-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
            onClick={() =>
              handleChangeStyles(item.style.getTextStyle(), () =>
                setActiveStyles(item.style.variant),
              )
            }
          >
            <span style={item.style.getTextStyle()}>{item.title}</span>
            <div>
              {activeStyle === item.style.variant && <Check className="mr-3" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
