import {
  useChangeActiveObjectFontSizeCommand,
  useChangeTextColorCommand,
  useToggleBoldTextCommand,
  useToggleItalicTextCommand,
  useToggleUnderlineTextCommand,
} from '@/app/hooks/editor-commands/useActiveObjectCommand';
import { useActiveObject } from '@/app/store/active-object';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { ColorResult } from 'react-color';
import { FontProperty } from '../ObjectProperty/Text/FontProperty';
import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';

export const TextProperties: FC = () => {
  const { activeObject } = useActiveObject();
  const [textColor, setTextColor] = useState<string | undefined>(
    activeObject?.fill?.toString(),
  );

  const toggleBoldText = useToggleBoldTextCommand();
  const toggleItalicText = useToggleItalicTextCommand();
  const toggleUnderlineText = useToggleUnderlineTextCommand();
  const changeColorCommand = useChangeTextColorCommand();

  const handleChangeTextColor = (color: ColorResult) => {
    changeColorCommand(color.hex, () => setTextColor(color.hex));
  };

  const { setSelectedProperty } = useSelectedProperty();

  return (
    <div className="flex gap-1 items-center overflow-x-scroll">
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextFont)}>
        Font
      </Button>
      <Button>Text styles</Button>
      <Button
        onClick={() => setSelectedProperty(SelectedProperty.TextFontSize)}
      >
        Font size
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextColor)}>
        Color
      </Button>
      <Button>Format</Button>
      <Button>Spacing</Button>
      <Button>Effects</Button>
      <Button>Animate</Button>
      <Button>Transparency</Button>
      <Button>Layers</Button>
      <Button>Position</Button>
      <Button>Nudge</Button>
      <Button>More</Button>

      <FontProperty />
    </div>
  );
};
