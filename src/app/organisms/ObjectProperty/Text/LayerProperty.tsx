import { MoveableObject } from '@/app/factories/MoveableObject';
import { usePageObjectsById } from '@/app/hooks/usePageObjects';
import { useActivePage } from '@/app/store/active-page';
import { parseTransformString } from '@/app/utilities/utils';
import { FC, useState } from 'react';

interface LayerPropertyProps {}
enum MODE {
  'all',
  'override',
}
export const LayerProperty: FC<LayerPropertyProps> = ({}) => {
  const [mode, setMode] = useState<MODE>(MODE.all);
  const { activePage } = useActivePage();
  const [pageObjects] = usePageObjectsById(activePage);

  const ElementRender = (pageObject: MoveableObject) => {
    const element = pageObject.getElement();
    if (element) {
      const transformString = parseTransformString(element.style.transform);
      const elementString = transformString.translate
        ? element.outerHTML.replaceAll(
            transformString.translate,
            'translate(0px, 0px)',
          )
        : element.outerHTML;
      return (
        <div
          className={`h-12 w-full bg-[#35475a33] rounded-lg	flex items-center justify-center`}
          key={element.id}
        >
          <div
            className={`flex items-center justify-center relative`}
            dangerouslySetInnerHTML={{
              __html: elementString,
            }}
            style={{
              scale: 48 / element.getBoundingClientRect().height,
            }}
          ></div>
        </div>
      );
    }
    return '';
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center m-1">
        <span>Lớp</span>
      </div>
      <div className="w-full h-10 border border-[#2b3b4a4d] rounded flex">
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.all && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.all)}
        >
          Tất cả
        </div>
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.override && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.override)}
        >
          Đè lên nhau
        </div>
      </div>
      {mode === MODE.all && (
        <div className="group flex flex-col flex-1 gap-1 w-full overflow-auto">
          {pageObjects &&
            pageObjects.map(pageObject => ElementRender(pageObject))}
        </div>
      )}
    </div>
  );
};
