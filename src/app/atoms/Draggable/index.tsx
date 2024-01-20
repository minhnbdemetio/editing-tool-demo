import Moveable from 'moveable';
import React, {
  HtmlHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import './style.scss';
import { useActivePage } from '@/app/store/active-page';

declare type DraggableProps = Omit<
  HtmlHTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragEnd'
> & {
  onDrag: (point: { x: number; y: number }, target: HTMLElement) => void;
  onDragEnd?: (target: HTMLElement) => void;
  style?: any;
  dragStyle?: 'free' | 'xOnly' | 'yOnly';
  id?: string;
};

export function Draggable({
  onDrag,
  dragStyle,
  id,
  style,
  children,
  onDragEnd,
  ...rest
}: DraggableProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const activePage = useActivePage();

  useEffect(() => {
    const container = document.getElementById(activePage?.activePage || '');
    if (container && ref.current) {
      const moveable = new Moveable(container, {
        target: ref.current,
        draggable: true,
        scalable: false,
        keepRatio: true,
        rotatable: false,
        resizable: false,
        className: 'draggable',
      });
      moveable.on('drag', function (e) {
        var matrix = new WebKitCSSMatrix(e.target.style.transform);
        var newMatrix = new WebKitCSSMatrix(e.transform);

        if (!dragStyle || dragStyle === 'free') {
          onDrag({ x: matrix.m41, y: matrix.m42 }, e.target as HTMLElement);
          e.target.style.transform = e.transform;
        } else if (dragStyle === 'xOnly') {
          e.target.style.transform = `translate(${newMatrix.m41}px, ${matrix.m42}px)`;
          onDrag({ x: newMatrix.m41, y: matrix.m42 }, e.target as HTMLElement);
        } else if (dragStyle === 'yOnly') {
          e.target.style.transform = `translate(${matrix.m41}px, ${newMatrix.m42}px)`;
          onDrag({ x: matrix.m41, y: newMatrix.m42 }, e.target as HTMLElement);
        }
      });
      moveable.on('dragEnd', function (e) {
        if (onDragEnd) {
          onDragEnd(e.target as HTMLElement);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={id} ref={ref} style={style || {}} {...rest}>
      {children}
    </div>
  );
}
