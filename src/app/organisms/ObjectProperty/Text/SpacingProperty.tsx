import { Button } from '@/app/atoms/Button';
import {
  useChangeTextLineHeight,
  useChangeTextSpacing,
  useChangeTextTransformOrigin,
  useUpdateTextStretchFont,
} from '@/app/hooks/useActiveMoveableObject';

import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { AnchorBottom } from '@/app/icons/AnchorBottom';
import { AnchorCenter } from '@/app/icons/AnchorCenter';
import { AnchorTop } from '@/app/icons/AnchorTop';
import { useDesign } from '@/app/store/design-objects';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useState } from 'react';
import { DEFAULT_TEXT_SCALE } from '@/app/lib/moveable/constant/text';

interface SpacingPropertyProps {}

const SPACING_STEP = 1;
const MAX_SPACING = 12;
const MIN_SPACING = -2;
const LINE_HEIGHT_STEP = 2;
const MIN_LINE_HEIGHT = 22;
const MAX_LINE_HEIGHT = 120;

export const SpacingProperty: FC<SpacingPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const [spacing, setSpacing] = useState<number | undefined>(
    activeText?.getLetterSpacing() || 0,
  );
  const [lineHeight, setLineHeight] = useState<number | undefined>(
    activeText?.getLineHeight(),
  );
  const [stretchFont, setStretchFont] = useState<number>(
    (activeText?.scaleX || DEFAULT_TEXT_SCALE) * 100,
  );
  const { moveable } = useDesign();

  const handleChangeLetterSpacing = useChangeTextSpacing(activeText);
  const handleChangeLineHeight = useChangeTextLineHeight(activeText);
  const handleChangeMoveableTextTransformOrigin =
    useChangeTextTransformOrigin(activeText);
  const handleUpdateTextStretchFont = useUpdateTextStretchFont(activeText);
  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>Spacing</span>
      </div>
      <Slider
        label="Letter spacing"
        size="sm"
        step={SPACING_STEP}
        maxValue={MAX_SPACING}
        minValue={MIN_SPACING}
        color="foreground"
        classNames={{
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
                value={spacing}
                onChange={e => {
                  const v = +e.target.value;
                  if (isNaN(v)) return;
                  handleChangeLetterSpacing(v, () => setSpacing(v));
                }}
              />
            </Tooltip>
          </output>
        )}
        value={spacing}
        onChange={value => {
          if (typeof value === 'number') {
            handleChangeLetterSpacing(value, () => setSpacing(value));
          }
        }}
      />
      <Slider
        label="Line spacing"
        size="sm"
        step={LINE_HEIGHT_STEP}
        maxValue={MAX_LINE_HEIGHT}
        minValue={MIN_LINE_HEIGHT}
        color="foreground"
        classNames={{
          label: 'text-medium mt-[12px]',
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
                value={lineHeight}
                onChange={e => {
                  const v = +e.target.value;
                  if (isNaN(v)) return;
                  handleChangeLineHeight(v, () => setLineHeight(v));
                }}
              />
            </Tooltip>
          </output>
        )}
        value={lineHeight}
        onChange={value => {
          if (typeof value === 'number') {
            handleChangeLineHeight(value, () => setLineHeight(value));
          }
        }}
      />
      <Slider
        label="Stretch line"
        size="sm"
        step={1}
        maxValue={150}
        minValue={50}
        color="foreground"
        classNames={{
          label: 'text-medium mt-[12px]',
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
                value={stretchFont}
                onChange={e => {
                  const v = +e.target.value;
                  if (isNaN(v)) return;
                  handleUpdateTextStretchFont(v, () => setStretchFont(v));
                }}
              />
            </Tooltip>
          </output>
        )}
        value={stretchFont}
        onChange={value => {
          if (typeof value === 'number') {
            handleUpdateTextStretchFont(value, () => setStretchFont(value));
          }
        }}
      />
      <hr className="mt-[24px] mb-[24px] border-t border-[#e5e7eb]" />
      <div className="w-full flex items-center justify-between">
        <p className="flex items-center">
          <span>Anchor text box</span>
        </p>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() =>
              handleChangeMoveableTextTransformOrigin('bottom', () => {
                moveable?.updateRect();
              })
            }
            isIconOnly
          >
            <AnchorBottom />
          </Button>
          <Button
            onClick={() =>
              handleChangeMoveableTextTransformOrigin('center', () => {
                moveable?.updateRect();
              })
            }
            isIconOnly
          >
            <AnchorCenter />
          </Button>
          <Button
            onClick={() =>
              handleChangeMoveableTextTransformOrigin('top', () => {
                moveable?.updateRect();
              })
            }
            isIconOnly
          >
            <AnchorTop />
          </Button>
        </div>
      </div>
    </div>
  );
};
