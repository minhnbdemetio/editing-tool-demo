import Moveable from 'moveable';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import './style.scss';

interface DraggableProps extends PropsWithChildren {
  onDrag: (point: { x: number; y: number }) => void;
  style?: any;
}

export function Draggable(props: DraggableProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('page');
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
        console.debug('matrix', matrix);
        props.onDrag({ x: matrix.m41, y: matrix.m42 });
        e.target.style.transform = e.transform;
      });
    }
  }, []);

  return (
    <div ref={ref} style={props.style || {}}>
      {props.children}
    </div>
  );
}
