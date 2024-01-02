import {
  useChangeActiveObjectFontSizeCommand,
  useChangeTextColorCommand,
  useToggleBoldTextCommand,
  useToggleItalicTextCommand,
  useToggleUnderlineTextCommand,
} from '@/app/hooks/editor-commands/useActiveObjectCommand';
import { useActiveObject } from '@/app/store/active-object';
import { Button, Input } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

const FONT_SIZE_OFFSET = 1;

export const TextMenuProperty: FC = () => {
  const { activeObject } = useActiveObject();
  const [fontSize, setFontSize] = useState(activeObject?.get('fontSize'));
  const [textColor, setTextColor] = useState<string | undefined>(
    activeObject?.fill?.toString(),
  );

  const handleChangeFontSize = useChangeActiveObjectFontSizeCommand();

  const decreaseFontSize = () => {
    const decreasedFontSize = fontSize - FONT_SIZE_OFFSET;
    handleChangeFontSize(decreasedFontSize, () =>
      setFontSize(decreasedFontSize),
    );
  };

  const increaseFontSize = () => {
    const increasedFontSize = fontSize + FONT_SIZE_OFFSET;
    handleChangeFontSize(increasedFontSize, () =>
      setFontSize(increasedFontSize),
    );
  };

  const toggleBoldText = useToggleBoldTextCommand();
  const toggleItalicText = useToggleItalicTextCommand();
  const toggleUnderlineText = useToggleUnderlineTextCommand();
  const changeColorCommand = useChangeTextColorCommand();

  const handleChangeTextColor = (color: ColorResult) => {
    changeColorCommand(color.hex, () => setTextColor(color.hex));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Button>Align</Button>
          <Button>Order</Button>
        </div>
        <div>
          <Button>Stylize</Button>
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <Button onClick={decreaseFontSize}>-</Button>
          <Input
            type="number"
            value={fontSize}
            onValueChange={value =>
              handleChangeFontSize(+value, () => setFontSize(+value))
            }
          ></Input>
          <Button onClick={increaseFontSize}>+</Button>
        </div>
        <Button onClick={() => toggleBoldText()}>
          <strong>B</strong>
        </Button>
        <Button onClick={() => toggleItalicText()}>
          <i>I</i>
        </Button>
        <Button onClick={() => toggleUnderlineText()}>U</Button>
        <SketchPicker color={textColor} onChange={handleChangeTextColor} />
      </div>
    </div>
  );
};
