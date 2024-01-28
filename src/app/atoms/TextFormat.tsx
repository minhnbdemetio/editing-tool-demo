import { Button, ButtonGroup } from '@nextui-org/react';
import React from 'react';
import { Bold } from '../icons/Bold';
import { Italic } from '../icons/Italic';
import { Underline } from '../icons/Underline';
import { Stroke } from '../icons/Stroke';
import { ToggleCapital } from '../icons/ToggleCapital';
import { TextAlignLeft } from '../icons/TextAlignLeft';
import { TextAlignCenter } from '../icons/TextAlignCenter';
import { TextAlignRight } from '../icons/TextAlignRight';
import { TextAlignBoth } from '../icons/TextAlignBoth';
import { BulletList } from '../icons/BulletList';
import { NumberedList } from '../icons/NumberedList';

import {
  useChangeTextAlign,
  useToggleItalicText,
  useToggleLineThroughText,
  useToggleListTypeDiscText,
  useToggleListTypeNumberText,
  useToggleMoveableBoldText,
  useToggleUnderlineText,
  useToggleUppercaseText,
} from '../hooks/useActiveMoveableObject';
import { MoveableTextObject } from '../lib/moveable/text/MoveableText';

interface TextFormatProps {
  activeText: MoveableTextObject | null;
}

export const TextFormat: React.FC<TextFormatProps> = ({ activeText }) => {
  const toggleBoldText = useToggleMoveableBoldText(activeText);
  const toggleItalicTextCommand = useToggleItalicText(activeText);
  const toggleUnderlineTextCommand = useToggleUnderlineText(activeText);
  const toggleStrokeTextCommand = useToggleLineThroughText(activeText);

  const toggleCapitalTextCommand = useToggleUppercaseText(activeText);
  const changeTextAlignCommand = useChangeTextAlign(activeText);
  const toggleListTypeDiscTextCommand = useToggleListTypeDiscText(activeText);
  const toggleListTypeNumberTextCommand =
    useToggleListTypeNumberText(activeText);

  return (
    <>
      {' '}
      <div className="w-full h-full">
        <div className="text-center mb-3">
          <span>Format</span>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            onClick={() => toggleBoldText()}
            className="w-full"
            isIconOnly
          >
            <Bold />
          </Button>
          <Button
            onClick={() => toggleItalicTextCommand()}
            className="w-full"
            isIconOnly
          >
            <Italic />
          </Button>
          <Button
            onClick={() => toggleUnderlineTextCommand()}
            className="w-full"
            isIconOnly
          >
            <Underline />
          </Button>
          <Button
            onClick={() => toggleStrokeTextCommand()}
            className="w-full"
            isIconOnly
          >
            <Stroke />
          </Button>
          <Button
            onClick={() => toggleCapitalTextCommand()}
            className="w-full"
            isIconOnly
          >
            <ToggleCapital />
          </Button>
        </div>
        <ButtonGroup className="w-full my-3">
          <Button
            className="w-full"
            isIconOnly
            onClick={() => changeTextAlignCommand('left')}
          >
            <TextAlignLeft />
          </Button>
          <Button
            className="w-full"
            isIconOnly
            onClick={() => changeTextAlignCommand('center')}
          >
            <TextAlignCenter />
          </Button>
          <Button
            className="w-full"
            isIconOnly
            onClick={() => changeTextAlignCommand('right')}
          >
            <TextAlignRight />
          </Button>
          <Button
            className="w-full"
            isIconOnly
            onClick={() => changeTextAlignCommand('justify')}
          >
            <TextAlignBoth />
          </Button>
        </ButtonGroup>

        <div className="flex gap-1 w-full">
          <Button
            className="w-full"
            isIconOnly
            onClick={() => toggleListTypeDiscTextCommand()}
          >
            <BulletList />
          </Button>
          <Button
            className="w-full"
            isIconOnly
            onClick={() => toggleListTypeNumberTextCommand()}
          >
            <NumberedList />
          </Button>
        </div>
      </div>
    </>
  );
};
