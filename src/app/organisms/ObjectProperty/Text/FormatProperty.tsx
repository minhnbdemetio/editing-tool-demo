import {
  useToggleBoldTextCommand,
  useToggleCapitalTextCommand,
  useToggleItalicTextCommand,
  useToggleStrokeTextCommand,
  useToggleUnderlineTextCommand,
} from '@/app/hooks/editor-commands/useActiveObjectCommand';
import {
  useActiveITextObject,
  useToggleCapitalText,
} from '@/app/hooks/useActiveObject';
import { Bold } from '@/app/icons/Bold';
import { BulletList } from '@/app/icons/BulletList';
import { Italic } from '@/app/icons/Italic';
import { NumberedList } from '@/app/icons/NumberedList';
import { Stroke } from '@/app/icons/Stroke';
import { TextAlignBoth } from '@/app/icons/TextAlignBoth';
import { TextAlignCenter } from '@/app/icons/TextAlignCenter';
import { TextAlignLeft } from '@/app/icons/TextAlignLeft';
import { TextAlignRight } from '@/app/icons/TextAlignRight';
import { ToggleCapital } from '@/app/icons/ToggleCaptial';
import { Underline } from '@/app/icons/Underline';
import { Button, ButtonGroup } from '@nextui-org/react';
import { FC, useState } from 'react';

interface FormatPropertyProps {}

export const FormatProperty: FC<FormatPropertyProps> = ({}) => {
  const toggleBoldTextCommand = useToggleBoldTextCommand();
  const toggleItalicTextCommand = useToggleItalicTextCommand();
  const toggleUnderlineTextCommand = useToggleUnderlineTextCommand();
  const toggleStrokeTextCommand = useToggleStrokeTextCommand();
  const toggleCapitalTextCommand = useToggleCapitalTextCommand();

  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>Format</span>
      </div>

      <div className="flex gap-2 items-center">
        <Button
          onClick={() => toggleBoldTextCommand()}
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
        <Button className="w-full" isIconOnly>
          <TextAlignLeft />
        </Button>
        <Button className="w-full" isIconOnly>
          <TextAlignCenter />
        </Button>
        <Button className="w-full" isIconOnly>
          <TextAlignRight />
        </Button>
        <Button className="w-full" isIconOnly>
          <TextAlignBoth />
        </Button>
      </ButtonGroup>

      <div className="flex gap-1 w-full">
        <Button className="w-full" isIconOnly>
          <BulletList />
        </Button>
        <Button className="w-full" isIconOnly>
          <NumberedList />
        </Button>
      </div>
    </div>
  );
};
