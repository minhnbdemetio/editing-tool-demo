import { TextColorPicker } from '@/app/molecules/TextColorPicker';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import clsx from 'clsx';
import SearchInput from '@/app/molecules/SearchInput';
import { useActiveMoveableShapeObject } from '@/app/hooks/useActiveMoveableObject';

const DEFAULT_COLORS = [
  '#000000',
  '#535353',
  '#737373',
  '#a6a5a6',
  '#D9D9D9',
  '#FFFFFF',
  '#FF3131',
  '#FF5757',
  '#FF66C4',
  '#CA6BE5',
  '#8C52FE',
  '#5E17EB',
  '#0096B1',
  '#09BFDF',
  '#5BE1E6',
  '#36B6FF',
  '#5171FF',
  '#034AAD',
  '#03BE62',
  '#7FD957',
  '#C1FF72',
  '#FEDE59',
  '#FFBC59',
  '#FF904D',
];

export const ShapeTextColorProperty: FC = () => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const shapeObject = useActiveMoveableShapeObject();
  const [palette, setPalette] = useState<Array<string>>([]);

  const handleCustomizeColor = () => {
    setColorPickerOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative mb-3 min-h-10">
        {colorPickerOpen && (
          <Button onClick={handleCustomizeColor}>Back</Button>
        )}
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform top-1/2">
          {colorPickerOpen ? 'Solid Color' : 'Color'}
        </span>
      </div>
      <div className="mb-3">
        <SearchInput placeholder='Try "blue" or "#00c4cc"' />
      </div>
      <div className="overflow-y-scroll h-full">
        {colorPickerOpen ? (
          <div>
            <TextColorPicker />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid gap-2 grid-cols-6">
              <Button
                size="lg"
                className="border-gray-200 border-1"
                onClick={() => setColorPickerOpen(true)}
                isIconOnly
              >
                +
              </Button>
              {palette.map(color => (
                <Button
                  size="lg"
                  className={clsx('border-gray-200 border-1')}
                  isIconOnly
                  onClick={() => shapeObject?.shapeText.setTextColor(color)}
                  style={{ backgroundColor: color }}
                  key={color}
                ></Button>
              ))}
            </div>

            <Button className="w-full my-3">+ Add your brand colors</Button>

            <span className="mt-3 mb-2">Default colors</span>
            <div className="grid gap-2 grid-cols-6">
              {DEFAULT_COLORS.map(color => (
                <Button
                  size="lg"
                  className="border-gray-200 border-1"
                  isIconOnly
                  onClick={() => shapeObject?.shapeText.setTextColor(color)}
                  style={{ backgroundColor: color }}
                  key={color}
                ></Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
