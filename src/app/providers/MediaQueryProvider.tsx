'use client';

import tailwindConfig from '../../../tailwind.config';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useMediaQuery from '../store/useMediaQuery';

const getScreenSize = () => {
  const screenConfig = tailwindConfig.theme?.extend?.screens;

  if (!screenConfig) {
    throw new Error('Not found screens config inside tailwind config!');
  } else {
    let screen: 'mobile' | 'desktop' = 'mobile';

    const toSizeNumber = (sizeStr: string) => +sizeStr.replace('px', '');

    Object.keys(screenConfig)
      .sort((a, b) =>
        toSizeNumber((screenConfig as any)[a]) <=
        toSizeNumber((screenConfig as any)[b])
          ? -1
          : 1,
      )
      .forEach(key => {
        const size = toSizeNumber((screenConfig as any)[key]);

        if (typeof window !== 'undefined') {
          if (size <= window.innerWidth) {
            screen = key as any;
          }
        }
      });

    return screen;
  }
};
export function MediaQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setMediaQuery = useMediaQuery(s => s.setDevice);
  const mediaQuery = useMediaQuery(s => s.device);

  const handleResize = useCallback(() => {
    const checkScreen = getScreenSize();

    if (checkScreen !== mediaQuery) {
      setMediaQuery(checkScreen);
    }
  }, [mediaQuery, setMediaQuery]);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return <>{children}</>;
}
