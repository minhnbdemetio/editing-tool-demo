import tailwindConfig from '../../../tailwind.config';
import { useCallback, useEffect, useMemo, useState } from 'react';

const getScreenSize = () => {
  const screenConfig = tailwindConfig.theme?.extend?.screens;

  if (!screenConfig) {
    throw new Error('Not found screens config inside tailwind config!');
  } else {
    let screen: 'mobile' | 'desktop' = 'desktop';

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

const useMediaQuery = (screen: 'mobile' | 'desktop') => {
  const [currentScreen, setCurrentScreen] = useState<'mobile' | 'desktop'>(
    getScreenSize(),
  );

  const handleResize = useCallback(() => {
    const checkScreen = getScreenSize();

    if (checkScreen !== currentScreen) {
      setCurrentScreen(checkScreen);
    }
  }, [currentScreen]);

  useEffect(() => {
    // Initial screen size detection
    handleResize();

    // Add event listener to track screen size changes
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return useMemo(() => screen === currentScreen, [screen, currentScreen]);
};

export default useMediaQuery;
