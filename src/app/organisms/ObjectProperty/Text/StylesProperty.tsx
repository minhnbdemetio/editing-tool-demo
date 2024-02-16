import { useChangeMoveableTextStylesCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Check } from '@/app/icons';
import { Document } from '@/app/icons/Document';
import { MoveableBodyTextObject } from '@/app/lib/moveable/text/MoveableBodyText';
import { MoveableHeadingTextObject } from '@/app/lib/moveable/text/MoveableHeadingText';
import { MoveableSubheadingTextObject } from '@/app/lib/moveable/text/MoveableSubheadingText';
import { TextStyle } from '@/app/lib/moveable/text/TextStyle';
import {
  isBodyFont,
  isHeadingFont,
  isSubheadingFont,
} from '@/app/lib/moveable/utils/text';
import { FC, useState } from 'react';

interface FontPropertyProps {}

const headingText = new MoveableHeadingTextObject();
const subHeadingText = new MoveableSubheadingTextObject();
const bodyText = new MoveableBodyTextObject();

export const StylesProperty: FC<FontPropertyProps> = ({}) => {
  const handleChangeStyles = useChangeMoveableTextStylesCommand();
  const activeText = useActiveTextObject();
  const [activeStyle, setActiveStyles] = useState<TextStyle | undefined>(
    activeText?.getTextStyle(),
  );

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
        <li
          className="my-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
          onClick={() => {
            handleChangeStyles(headingText.getTextStyle(), () =>
              setActiveStyles(headingText.getTextStyle()),
            );
          }}
        >
          <span style={headingText.getTextStyle()}>Heading</span>
          <div>
            {isHeadingFont(activeStyle?.fontSize) && <Check className="mr-3" />}
          </div>
        </li>
        <li
          className="my-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
          onClick={() => {
            handleChangeStyles(subHeadingText.getTextStyle(), () =>
              setActiveStyles(subHeadingText.getTextStyle()),
            );
          }}
        >
          <span style={subHeadingText.getTextStyle()}>Subheading</span>
          <div>
            {isSubheadingFont(activeStyle?.fontSize) && (
              <Check className="mr-3" />
            )}
          </div>
        </li>
        <li
          className="my-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
          onClick={() => {
            handleChangeStyles(bodyText.getTextStyle(), () =>
              setActiveStyles(bodyText.getTextStyle()),
            );
          }}
        >
          <span style={bodyText.getTextStyle()}>Body</span>
          <div>
            {isBodyFont(activeStyle?.fontSize) && <Check className="mr-3" />}
          </div>
        </li>
      </ul>
    </div>
  );
};
