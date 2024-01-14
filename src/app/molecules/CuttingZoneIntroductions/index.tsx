import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { ReactourStep } from 'reactour';

const Tour = dynamic(() => import('reactour'), {
  ssr: false,
});

interface CuttingZoneIntroductionProps {
  padding: number;
  safeZonePadding: number;
}
const steps: ReactourStep[] = [
  {
    selector: '.cutting-zone',
    content: 'This is printing zone',
  },
  {
    selector: '.safe-zone',
    content: 'This is cutting zone',
  },
];
export const CuttingZoneIntroduction: React.FC<
  CuttingZoneIntroductionProps
> = ({ padding, safeZonePadding }) => {
  const [open, setOpen] = useState(false);
  const onExit = () => {
    localStorage.setItem('IS_CUTTING_ZONE_GUIDE_SHOWN', '1');
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('IS_CUTTING_ZONE_GUIDE_SHOWN') !== '1') {
      setOpen(true);
    }
  }, []);

  return (
    <>
      {open && (
        <>
          <div
            className="absolute top-0 left-0 w-full cutting-zone"
            style={{ height: padding }}
          ></div>
          <div
            className="absolute  left-0 w-full safe-zone"
            style={{ height: safeZonePadding, top: padding }}
          ></div>
        </>
      )}
      <Tour
        highlightedMaskClassName="cutting-zone-intro-highlight"
        steps={steps}
        isOpen={open}
        onRequestClose={onExit}
      />
    </>
  );
};
