import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useUpdateShapeBorderColor } from '@/app/hooks/useActiveMoveableObject';

export const ShapeOutline = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const activeElement = activeMoveableObject?.getElement();
  const [color, setColor] = useState<string | undefined>(undefined);
  const [borderColor, setBorderColor] = useState<any>('#000000');
  const [showColorPicker, setShowColorPicker] = useState<Boolean>(false);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [showBorderColorPicker, setShowBorderColorPicker] =
    useState<Boolean>(false);
  const [opacity, setOpacity] = useState<number>(100);
  const changeBorderColorShape = useUpdateShapeBorderColor();

  useEffect(() => {
    if (activeElement instanceof HTMLElement) {
      const fillColorElement: HTMLDivElement | null =
        activeElement.querySelector('.fill-color');
      setColor(fillColorElement?.style.backgroundColor || '#000000');
      setOpacity(Number(fillColorElement?.style.opacity || 1) * 100);
    }
  }, [activeElement]);

  const handleChangeBorderColor = (color: any) => {
    changeBorderColorShape(color.hex, borderWidth);
    setBorderColor(color.hex);
  };

  const onChangeBorderWidth = (width: number) => {
    setBorderWidth(width);
    changeBorderColorShape(borderColor, width);
  };

  return (
    <div className="w-full h-full">
      <>
        <div className="flex w-full justify-between items-center my-1">
          <div className="m-4">Fill Border Color</div>
          <div
            className="border w-8 h-8 border-[#25282f1a] rounded-md flex items-center justify-center"
            onClick={() => {
              setShowBorderColorPicker(true);
            }}
          >
            <div
              className="w-6 h-6 rounded-md"
              style={{ backgroundColor: borderColor }}
            ></div>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-1">
          <div className="m-4">Border Width</div>
          <div
            className="border w-8 h-8 border-[#25282f1a] rounded-md flex items-center justify-center"
            onClick={() => {
              setShowBorderColorPicker(true);
            }}
          >
            <input
              type="number"
              value={borderWidth}
              onChange={e => {
                onChangeBorderWidth(+e.target.value as number);
              }}
              min={0}
              max={100}
              className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500 ml-2 p-2"
            />
          </div>
        </div>
      </>
      {showBorderColorPicker && (
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
            onChange={handleChangeBorderColor}
          ></SketchPicker>
        </>
      )}
    </div>
  );
};
