import { ChevronLeft } from '@/app/icons';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Button, Checkbox } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { Slider } from '@nextui-org/react';
import {
  useUpdateShapeBorderColor,
  useUpdateShapeColor,
} from '@/app/hooks/useActiveMoveableObject';

export const ShapeFillColor = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const activeElement = activeMoveableObject?.getElement();
  const [color, setColor] = useState<string | undefined>(undefined);
  const [borderColor, setBorderColor] = useState<string | undefined>('#000000');
  const [showColorPicker, setShowColorPicker] = useState<Boolean>(false);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [showBorderColorPicker, setShowBorderColorPicker] =
    useState<Boolean>(false);
  const [opacity, setOpacity] = useState<number>(100);
  const changeColorShape = useUpdateShapeColor();

  const changeBorderColorShape = useUpdateShapeBorderColor();

  useEffect(() => {
    if (activeElement instanceof HTMLElement) {
      const fillColorElement: HTMLDivElement | null =
        activeElement.querySelector('.fill-color');
      setColor(fillColorElement?.style.backgroundColor || '#000000');
      setOpacity(Number(fillColorElement?.style.opacity || 1) * 100);
    }
  }, [activeElement]);

  const handleChangeColor = (color: any) => {
    changeColorShape(color.hex);
    setColor(color.hex);
  };

  return (
    <div className="w-full h-full">
      <>
        <div className="flex w-full justify-between items-center my-1">
          <div className="m-4">Fill Color</div>
          <div
            className="border w-8 h-8 border-[#25282f1a] rounded-md flex items-center justify-center"
            onClick={() => {
              setShowColorPicker(true);
            }}
          >
            <div
              className="w-6 h-6 rounded-md"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </>
      {/* )} */}

      {showColorPicker && (
        <>
          <div className="relative mb-3 min-h-10">
            {showColorPicker && (
              <Button onClick={() => setShowColorPicker(false)}>Back</Button>
            )}
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform top-1/2">
              Color
            </span>
          </div>
          <SketchPicker
            width="auto"
            color={color}
            onChange={handleChangeColor}
          ></SketchPicker>
        </>
      )}
    </div>
  );
};
