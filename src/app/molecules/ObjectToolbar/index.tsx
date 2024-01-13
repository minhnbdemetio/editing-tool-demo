import * as React from 'react';
import Moveable, { MoveableManagerInterface, Renderer } from 'react-moveable';

export const ObjectToolbar = {
  name: 'toolbar',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    const { pos2 } = moveable.state;
    // Add key (required)
    // Add class prefix moveable-(required)
    const EditableViewer = moveable.useCSS(
      'div',
      `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            `,
    );
    return (
      <EditableViewer
        key={'toolbar-viewer'}
        className={'moveable-editable'}
        style={{
          transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
        }}
      >
        <button
          className="custom-button"
          onClick={() => {
            alert('+');
          }}
        >
          +
        </button>
        <button
          className="custom-button"
          onClick={() => {
            alert('-');
          }}
        >
          -
        </button>
      </EditableViewer>
    );
  },
} as const;
