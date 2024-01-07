import Moveable from 'moveable';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import './style.scss';

interface DraggableProps extends PropsWithChildren {
  onDrag: (point: { x: number; y: number }) => void;
  style?: any;
  dragStyle?: 'free' | 'xOnly' | 'yOnly';
  id?: string;
}

export function Draggable(props: DraggableProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('page');
    if (container && ref.current) {
      const originMatrix = new WebKitCSSMatrix(ref.current.style.transform);

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
        console.debug(matrix.m42);

        if (!props.dragStyle || props.dragStyle === 'free') {
          props.onDrag({ x: matrix.m41, y: matrix.m42 });
          e.target.style.transform = e.transform;
        } else if (props.dragStyle === 'xOnly') {
          e.target.style.transform = `translate(${newMatrix.m41}px, ${matrix.m42}px)`;
          props.onDrag({ x: newMatrix.m41, y: matrix.m42 });
        } else if (props.dragStyle === 'yOnly') {
          e.target.style.transform = `translate(${matrix.m41}px, ${newMatrix.m42}px)`;
          props.onDrag({ x: matrix.m41, y: newMatrix.m42 });
        }
      });
    }
  }, []);

  return (
    <div id={props.id} ref={ref} style={props.style || {}}>
      {props.children}
    </div>
  );
}
