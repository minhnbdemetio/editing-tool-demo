import { useCurrentPageCanvas } from '@/app/hooks/usePageCanvas';
import { useActiveObject } from '@/app/store/active-object';
import { Button, Input } from '@nextui-org/react';
import { FC, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

export const TextMenuProperty: FC = () => {
  const { activeObject } = useActiveObject();
  const [currentPageCanvas] = useCurrentPageCanvas();
  const [fontSize, setFontSize] = useState(activeObject?.get('fontSize'));
  const [textColor, setTextColor] = useState<string | undefined>(
    activeObject?.fill?.toString(),
  );

  const handleChangeFontSize = (value: number) => {
    setFontSize(value);
    activeObject?.set('fontSize', value);
    currentPageCanvas?.renderAll();
  };

  const decreaseFontSize = () => {
    handleChangeFontSize(fontSize - 1);
  };

  const increaseFontSize = () => {
    handleChangeFontSize(fontSize + 1);
  };

  const toggleBoldText = () => {
    const isBold = activeObject?.get('fontWeight') === 'bold';
    if (isBold) {
      activeObject.set('fontWeight', 400);
    } else {
      activeObject?.set('fontWeight', 'bold');
    }
    currentPageCanvas?.renderAll();
  };

  const toggleItalicText = () => {
    const isItalic = activeObject?.get('fontStyle') === 'italic';
    if (isItalic) {
      activeObject.set('fontStyle', 'normal');
    } else {
      activeObject?.set('fontStyle', 'italic');
    }
    currentPageCanvas?.renderAll();
  };

  const toggleUnderlineText = () => {
    const isUnderlined = activeObject?.get('textDecoration') === 'underline';
    if (isUnderlined) {
      activeObject.set('textDecoration', '');
    } else {
      activeObject?.set('textDecoration', 'underline');
    }
    currentPageCanvas?.renderAll();
  };

  const handleChangeTextColor = (color: ColorResult) => {
    setTextColor(color.hex);
    activeObject?.set({ fill: color.hex });
    currentPageCanvas?.renderAll();
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
            onValueChange={value => handleChangeFontSize(+value)}
          ></Input>
          <Button onClick={increaseFontSize}>+</Button>
        </div>
        <Button onClick={toggleBoldText}>
          <strong>B</strong>
        </Button>
        <Button onClick={toggleItalicText}>
          <i>I</i>
        </Button>
        <Button onClick={toggleUnderlineText}>U</Button>
        <SketchPicker color={textColor} onChange={handleChangeTextColor} />
      </div>
    </div>
  );
};
