import { useChangeTextColorCommand } from '@/app/hooks/editor-commands/useActiveObjectCommand';
import { TextColorPicker } from '@/app/molecules/TextColorPicker';
import { getRandomHexColors } from '@/app/utilities/color';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { clone } from 'lodash';

const SUGGESTED_COLOR_COUNT = 15;

export const ColorProperty: FC = () => {
  const [suggestedColors, setSuggestedColors] = useState(
    getRandomHexColors(SUGGESTED_COLOR_COUNT),
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const changeColorCommand = useChangeTextColorCommand();

  const handleSelectColor = (color: string) => {
    if (selectedColor !== color) {
      changeColorCommand(color);
      setSelectedColor(color);
    } else {
      setColorPickerOpen(true);
    }
  };

  const handleUpdateSuggestedColor = (color: string) => {
    const selectedColorIndex = suggestedColors.findIndex(
      suggestedColor => suggestedColor === selectedColor,
    );

    if (selectedColorIndex === -1) return;
    const clonedSuggestColors = clone(suggestedColors);
    clonedSuggestColors[selectedColorIndex] = color;
    setSuggestedColors(clonedSuggestColors);
    setSelectedColor(color);
  };

  const handleCustomizeColor = () => {
    setSelectedColor(null);
    setColorPickerOpen(false);
  };

  return (
    <div className="w-full h-full">
      <div className="relative flex items-center mb-3 min-h-14">
        {colorPickerOpen ? (
          <Button onClick={handleCustomizeColor}>Back</Button>
        ) : (
          <></>
        )}
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform top-1/2">
          {colorPickerOpen ? 'Solid Color' : 'Color'}
        </span>
        <div></div>
      </div>

      {colorPickerOpen ? (
        <div>
          <TextColorPicker onSelectColor={handleUpdateSuggestedColor} />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid gap-2 grid-cols-6">
            <Button onClick={() => setColorPickerOpen(true)} isIconOnly>
              +
            </Button>
            {suggestedColors.map(color => (
              <Button
                isIconOnly
                onClick={() => handleSelectColor(color)}
                style={{ backgroundColor: color }}
                key={color}
              ></Button>
            ))}
          </div>

          <Button className="w-full my-3">+ Add your brand colors</Button>

          <span>Photo colors</span>
          <div className="grid gap-2 grid-cols-6">
            {suggestedColors.map(color => (
              <Button
                isIconOnly
                onClick={() => changeColorCommand(color)}
                style={{ backgroundColor: color }}
                key={color}
              ></Button>
            ))}
          </div>

          <span>Default colors</span>
          <div className="grid gap-2 grid-cols-6">
            {suggestedColors.map(color => (
              <Button
                isIconOnly
                onClick={() => changeColorCommand(color)}
                style={{ backgroundColor: color }}
                key={color}
              ></Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
