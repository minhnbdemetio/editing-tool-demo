import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { usePageSize } from '@/app/store/use-page-size';
import { SvgAlignment } from '@/app/utilities/svg-line';
import { FC } from 'react';

export const LineAlignProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const pageSize = usePageSize();

  if (!activeLineObject) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <div className="w-full grid grid-cols-2">
          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.LEFT);
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Left
          </button>
          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.TOP);
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Top
          </button>

          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.CENTER, {
                width: pageSize.workingWidthPixels,
              });
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Center
          </button>
          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.MIDDLE, {
                height: pageSize.workingHeightPixels,
              });
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Middle
          </button>

          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.RIGHT, {
                width: pageSize.workingWidthPixels,
              });
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Right
          </button>

          <button
            onClick={() => {
              activeLineObject.line.align(SvgAlignment.BOTTOM, {
                height: pageSize.workingHeightPixels,
              });
              activeLineObject.updateUI();
              activeLineObject.updateHeadControl();
              activeLineObject.updatePointerControllerUI();
            }}
          >
            Bottom
          </button>
        </div>
      </div>
    </>
  );
};
