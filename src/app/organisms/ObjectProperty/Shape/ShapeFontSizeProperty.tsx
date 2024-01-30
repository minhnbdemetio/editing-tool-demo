import {
  useActiveMoveableShapeObject,
  useActiveTextObject,
  useUpdateFontSize,
} from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useState } from 'react';

interface ShapeFontSizePropertyProps {}

const MIN_FONT_SIZE = 1;
const FONT_SIZE_STEP = 1;
const MAX_FONT_SIZE = 144;

export const ShapeFontSizeProperty: FC<ShapeFontSizePropertyProps> = ({}) => {
  const activeText = useActiveMoveableShapeObject();

  const [fontSize, setFontSize] = useState(activeText?.shapeText.getFontSize());

  const handleChangeFontSize = (_size: number) => {
    activeText?.shapeText.setFontSize(_size);
    setFontSize(_size);
  };

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <span>Font size</span>
      </div>
      <Slider
        label="Font size"
        size="sm"
        step={FONT_SIZE_STEP}
        maxValue={MAX_FONT_SIZE}
        minValue={MIN_FONT_SIZE}
        color="foreground"
        classNames={{
          base: 'max-w-md',
          label: 'text-medium',
        }}
        renderValue={({ children, ...props }) => (
          <output {...props}>
            <Tooltip
              className="text-tiny text-default-500 rounded-md"
              content="Press Enter to confirm"
              placement="left"
            >
              <input
                className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                type="text"
                aria-label="Temperature value"
                value={fontSize}
                onChange={e => {
                  const v = +e.target.value;
                  handleChangeFontSize(v);
                  setFontSize(v);
                }}
              />
            </Tooltip>
          </output>
        )}
        value={fontSize}
        onChange={value => {
          if (typeof value === 'number') {
            handleChangeFontSize(value);
            setFontSize(value);
          }
        }}
      />
    </div>
  );
};
