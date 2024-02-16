import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends PropsWithChildren {
  label: string;
  className?: string;
}

export const DownloadOptionWrapper = ({
  label,
  children,
  className,
}: Props) => {
  return (
    <div className={twMerge('space-y-3', className)}>
      <p className="font-bold text-smd leading-4.5">{label}</p>
      {children}
    </div>
  );
};
