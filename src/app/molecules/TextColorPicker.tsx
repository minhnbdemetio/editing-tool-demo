import { FC, useState } from 'react';
import { ColorResult, SketchPicker, Color } from 'react-color';
import { useChangeTextColorCommand } from '../hooks/editor-commands/useActiveObjectCommand';
import { useActiveITextObject } from '../hooks/useActiveObject';

interface TextColorPickerProps {
  onSelectColor: (color: string) => any;
}

export const TextColorPicker: FC<TextColorPickerProps> = ({
  onSelectColor,
}) => {
  const changeColorCommand = useChangeTextColorCommand();
  const activeText = useActiveITextObject();
  const [color, setColor] = useState<string | undefined>(
    activeText?.get('fill')?.toString(),
  );

  const handleChangeColor = (color: ColorResult) => {
    changeColorCommand(color.hex, () => setColor(color.hex));
    onSelectColor(color.hex);
  };

  return (
    <div>
      <SketchPicker
        width="auto"
        color={color}
        onChange={handleChangeColor}
      ></SketchPicker>
    </div>
  );
};
