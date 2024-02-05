import { FC, useEffect, useRef } from 'react';
import { useActivePage } from '@/app/store/active-page';
import { twMerge } from '@/app/utilities/tailwind';
import { EDITOR_CONTAINER } from '../Editor';
import { getElementById } from '@/app/utilities/utils';

interface PageRenderProps {
  key: string;
  index: number;
  page: string;
}

export const PageRender: FC<PageRenderProps> = ({ page, index }) => {
  const { setActivePage, activePage } = useActivePage();
  const containerRef = useRef<HTMLDivElement>(null);
  const editorContainer = document.getElementById(EDITOR_CONTAINER);
  useEffect(() => {
    if (page && containerRef.current) {
      if (editorContainer) {
        try {
          const pageElement = getElementById(editorContainer, page);
          const clonedElement = pageElement?.cloneNode(true) as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = `scale(${
              (containerRef.current.offsetWidth || 1) /
              ((pageElement as HTMLElement).offsetWidth || 1)
            })`;
            const div = document.createElement('div');
            div.innerHTML = clonedElement.outerHTML;
            const node = div.firstChild;
            while (containerRef.current?.firstChild) {
              containerRef.current.removeChild(containerRef.current.firstChild);
            }
            if (node instanceof Node) {
              containerRef.current.appendChild(node);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [page, editorContainer]);

  return (
    <div
      className={twMerge(
        'flex w-full px-0.5 pb-2 flex-col items-center gap-2 flex-shrink-0 rounded-lg cursor-pointer',
        { 'bg-[#A8C5FA33]': page === activePage },
      )}
      key={page}
      onClick={() => setActivePage(page)}
    >
      <div className="w-full h-fit relative pointer-events-none rounded-lg shadow-page">
        <div
          className={twMerge(
            'w-full bg-[#EBECF0] aspect-[153/137] rounded-lg border',
          )}
        ></div>
        <div
          className={twMerge(
            'absolute w-full h-full top-0 rounded-lg overflow-hidden outline outline-2 border-2 border-white',
            page === activePage ? 'outline-primary1' : 'outline-transparent',
          )}
          ref={containerRef}
        ></div>
      </div>
      <div className="h-6 flex items-center text-smd leading-4.5 font-bold">
        {index + 1}
      </div>
    </div>
  );
};
