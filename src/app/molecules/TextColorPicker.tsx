import { FC, useState } from 'react';
import { ColorResult, SketchPicker, Color } from 'react-color';
import {
  useActiveTextObject,
  useUpdateTextColor,
} from '../hooks/useActiveMoveableObject';

interface TextColorPickerProps {
  onSelectColor?: (color: string) => any;
}

export const TextColorPicker: FC<TextColorPickerProps> = ({
  onSelectColor,
}) => {
  const changeColorCommand = useUpdateTextColor();
  const activeText = useActiveTextObject();
  const [color, setColor] = useState<string | undefined>(
    activeText?.getCssProperty('color') || undefined,
  );

  const handleChangeColor = (color: ColorResult) => {
    changeColorCommand(color.hex);
    setColor(color.hex);
    onSelectColor && onSelectColor(color.hex);
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
