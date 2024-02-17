import { useCallback, useEffect, useState } from 'react';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | undefined;

export const useSwipeHandler = (
  type: 'horizontal' | 'vertical',
  callback: (direction: SwipeDirection) => void | undefined,
) => {
  const [touchStartPosition, setTouchStartPosition] = useState([0, 0]);

  const getDirection = useCallback(
    (touchEndX: number, touchEndY: number): SwipeDirection => {
      const [touchStartX, touchStartY] = touchStartPosition;

      if (type === 'horizontal' && touchEndX < touchStartX) {
        return 'left';
      }

      if (type === 'horizontal' && touchEndX > touchStartX) {
        return 'right';
      }

      if (type === 'vertical' && touchEndY < touchStartY) {
        return 'up';
      }

      if (type === 'vertical' && touchEndY > touchStartY) {
        return 'down';
      }

      return;
    },
    [type, touchStartPosition],
  );

  const onTouchStart = useCallback((event: TouchEvent) => {
    setTouchStartPosition([
      event.changedTouches[0].screenX,
      event.changedTouches[0].screenY,
    ]);
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].screenX;
      const touchEndY = event.changedTouches[0].screenY;

      const direction = getDirection(touchEndX, touchEndY);

      // Reset position
      setTouchStartPosition([0, 0]);

      if (typeof callback === 'function') {
        callback(direction);
      }
    },
    [callback, getDirection],
  );

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchEnd, onTouchStart]);
};
