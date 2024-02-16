import { Button } from '@/app/atoms/Button';
import { IconProps } from '@/app/types';
import { FC } from 'react';

interface Props {
  label: string;
  Icon: FC<IconProps>;
  actionLabel: string;
  onClick?: () => void;
}

export const FilePopoverAction = ({
  label,
  Icon,
  actionLabel,
  onClick,
}: Props) => {
  return (
    <div className="w-full flex gap-6 items-center justify-between">
      <div className="flex-1 text-smm text-pirmaryGray leading-4 whitespace-pre-wrap">
        {label}
      </div>
      <Button
        color="secondary"
        className="w-[135px] flex font-medium"
        startContent={<Icon className="w-5 h-[22px]" />}
        onClick={onClick}
      >
        {actionLabel}
      </Button>
    </div>
  );
};
