import { fireEvent, renderHook } from '@testing-library/react';
import { useOutsideClick } from './useClickOutside';

describe('useOutsideClick', () => {
  it('should call the callback when a mousedown event is triggered outside the ref', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useOutsideClick(callback));
    const div = document.createElement('div');
    const divOutSide = document.createElement('div');
    result.current.current = div;

    document.body.appendChild(div);
    document.body.appendChild(divOutSide);

    fireEvent.mouseDown(divOutSide);

    expect(callback).toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it('should not call the callback when a mousedown event is triggered inside the ref', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useOutsideClick(callback));
    const div = document.createElement('div');
    const divOutSide = document.createElement('div');
    result.current.current = div;

    document.body.appendChild(div);
    document.body.appendChild(divOutSide);

    fireEvent.mouseDown(div);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it('should remove the event listener when the component is unmounted', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useOutsideClick(callback));
    const div = document.createElement('div');
    document.body.appendChild(div);

    unmount();

    fireEvent.mouseDown(div);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });
});
