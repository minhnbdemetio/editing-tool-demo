import { useChangeTextColorCommand } from '@/app/hooks/editor-commands/useActiveObjectCommand';
import { TextColorPicker } from '@/app/molecules/TextColorPicker';
import { Button } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import SearchInput from '@/app/molecules/SearchInput';

import { useActivePageCanvas } from '@/app/hooks/useActivePage';
import { getCanvasPalette } from '@/app/utilities/canvas';
import { createLinearGradientString } from '@/app/utilities/color';
import { useChangeTextColorGradient } from '@/app/hooks/useActiveObject';

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

const GRADIENT_OPTIONS = [
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(255, 145, 198)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(255, 146, 137)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(255, 255, 86)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(132, 246, 79)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(114, 249, 230)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(86, 189, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(151, 149, 240)' },
  ],
  [
    { offset: 0, color: 'rgb(244, 144, 191)' },
    { offset: 1, color: 'rgb(130, 32, 72)' },
  ],
  [
    { offset: 0, color: 'rgb(245, 144, 132)' },
    { offset: 1, color: 'rgb(161, 39, 20)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 237, 100)' },
    { offset: 1, color: 'rgb(228, 110, 38)' },
  ],
  [
    { offset: 0, color: 'rgb(147, 242, 94)' },
    { offset: 1, color: 'rgb(37, 99, 27)' },
  ],
  [
    { offset: 0, color: 'rgb(129, 247, 230)' },
    { offset: 1, color: 'rgb(33, 95, 90)' },
  ],
  [
    { offset: 0, color: 'rgb(92, 183, 249)' },
    { offset: 1, color: 'rgb(19, 68, 113)' },
  ],
  [
    { offset: 0, color: 'rgb(206, 206, 206)' },
    { offset: 1, color: 'rgb(84, 84, 84)' },
  ],
  [
    { offset: 0, color: 'rgb(163, 155, 170)' },
    { offset: 1, color: 'rgb(33, 24, 40)' },
  ],
  [
    { offset: 0, color: 'rgb(182, 97, 84)' },
    { offset: 1, color: 'rgb(52, 17, 3)' },
  ],
  [
    { offset: 0, color: 'rgb(203, 182, 109)' },
    { offset: 1, color: 'rgb(121, 94, 48)' },
  ],
  [
    { offset: 0, color: 'rgb(170, 189, 148)' },
    { offset: 1, color: 'rgb(46, 62, 36)' },
  ],
  [
    { offset: 0, color: 'rgb(145, 156, 169)' },
    { offset: 1, color: 'rgb(19, 68, 113)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 1, color: 'rgb(0, 0, 0)' },
  ],
  [
    { offset: 0, color: 'rgb(254, 207, 239)' },
    { offset: 1, color: 'rgb(255, 154, 158)' },
  ],
  [
    { offset: 0, color: 'rgb(254, 225, 64)' },
    { offset: 1, color: 'rgb(250, 112, 154)' },
  ],
  [
    { offset: 0, color: 'rgb(253, 219, 146)' },
    { offset: 1, color: 'rgb(209, 253, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 251, 125)' },
    { offset: 1, color: 'rgb(209, 253, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 241, 235)' },
    { offset: 1, color: 'rgb(172, 224, 249)' },
  ],
  [
    { offset: 0, color: 'rgb(55, 255, 235)' },
    { offset: 1, color: 'rgb(155, 173, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(251, 200, 212)' },
    { offset: 1, color: 'rgb(151, 149, 240)' },
  ],
  [
    { offset: 0, color: 'rgb(228, 43, 105)' },
    { offset: 1, color: 'rgb(79, 46, 117)' },
  ],
  [
    { offset: 0, color: 'rgb(218, 255, 55)' },
    { offset: 1, color: 'rgb(255, 132, 132)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 227, 85)' },
    { offset: 1, color: 'rgb(136, 0, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(249, 240, 71)' },
    { offset: 1, color: 'rgb(15, 216, 80)' },
  ],
  [
    { offset: 0, color: 'rgb(62, 237, 172)' },
    { offset: 1, color: 'rgb(238, 116, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(33, 212, 253)' },
    { offset: 1, color: 'rgb(183, 33, 255)' },
  ],
  [
    { offset: 0, color: 'rgb(255, 0, 0)' },
    { offset: 0.17, color: 'rgb(255, 0, 255)' },
    { offset: 0.34, color: 'rgb(0, 0, 255)' },
    { offset: 0.5, color: 'rgb(0, 255, 255)' },
    { offset: 0.67, color: 'rgb(0, 255, 0)' },
    { offset: 0.84, color: 'rgb(255, 255, 0)' },
    { offset: 1, color: 'rgb(255, 0, 0)' },
  ],
  [
    { offset: 0.12, color: 'rgb(251, 246, 181)' },
    { offset: 0.35, color: 'rgb(238, 196, 83)' },
    { offset: 0.48, color: 'rgb(251, 246, 181)' },
    { offset: 0.7, color: 'rgb(254, 209, 94)' },
    { offset: 0.75, color: 'rgb(254, 207, 87)' },
    { offset: 1, color: 'rgb(252, 197, 60)' },
  ],
  [
    { offset: 0.12, color: 'rgb(252, 217, 106)' },
    { offset: 0.3, color: 'rgb(255, 255, 192)' },
    { offset: 0.53, color: 'rgb(202, 147, 70)' },
    { offset: 0.85, color: 'rgb(121, 80, 23)' },
    { offset: 1, color: 'rgb(232, 195, 132)' },
  ],
  [
    { offset: 0.12, color: 'rgb(190, 190, 190)' },
    { offset: 0.35, color: 'rgb(120, 120, 120)' },
    { offset: 0.48, color: 'rgb(240, 240, 240)' },
    { offset: 0.7, color: 'rgb(190, 190, 190)' },
    { offset: 1, color: 'rgb(240, 240, 240)' },
  ],
  [
    { offset: 0.12, color: 'rgb(180, 180, 180)' },
    { offset: 0.3, color: 'rgb(245, 245, 245)' },
    { offset: 0.52, color: 'rgb(170, 170, 170)' },
    { offset: 0.85, color: 'rgb(45, 45, 45)' },
    { offset: 1, color: 'rgb(120, 120, 120)' },
  ],
  [
    { offset: 0.12, color: 'rgb(239, 167, 125)' },
    { offset: 0.3, color: 'rgb(227, 199, 169)' },
    { offset: 0.52, color: 'rgb(167, 99, 61)' },
    { offset: 0.85, color: 'rgb(121, 55, 21)' },
    { offset: 1, color: 'rgb(239, 167, 125)' },
  ],
  [
    { offset: 0.12, color: 'rgb(58, 107, 139)' },
    { offset: 0.33, color: 'rgb(58, 159, 217)' },
    { offset: 0.43, color: 'rgb(209, 246, 255)' },
    { offset: 0.73, color: 'rgb(58, 159, 217)' },
    { offset: 1, color: 'rgb(58, 114, 150)' },
  ],
];

export const ColorProperty: FC = () => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const changeColorCommand = useChangeTextColorCommand();

  const activePageCanvas = useActivePageCanvas();
  const [palette, setPalette] = useState<Array<string>>([]);

  const getActiveCanvasPalette = async () => {
    const canvasPalette = await getCanvasPalette(activePageCanvas);
    setPalette(canvasPalette);
  };

  const changeColorGradient = useChangeTextColorGradient();

  useEffect(() => {
    getActiveCanvasPalette();
  }, [activePageCanvas]);

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
                  onClick={() => changeColorCommand(color)}
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
                  onClick={() => changeColorCommand(color)}
                  style={{ backgroundColor: color }}
                  key={color}
                ></Button>
              ))}
            </div>

            <span className="mt-3 mb-2">Gradient </span>
            <div className="grid gap-2 grid-cols-6">
              {GRADIENT_OPTIONS.map(gradient => (
                <Button
                  size="lg"
                  className="border-gray-200 border-1"
                  isIconOnly
                  onClick={() => changeColorGradient(gradient)}
                  style={{ background: createLinearGradientString(gradient) }}
                  key={createLinearGradientString(gradient)}
                ></Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
