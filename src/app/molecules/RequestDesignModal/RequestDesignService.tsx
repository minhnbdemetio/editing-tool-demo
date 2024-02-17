import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  name: string;
  price: string;
  selectedService: string;
  onClick?: () => void;
}

export const RequestDesignService = ({
  name,
  price,
  selectedService,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        clsx(
          'w-full text-left p-4 space-y-0.5 text-md leading-5 font-bold border border-border rounded-lg',
          {
            'border-primary1 bg-tertiary/20': name === selectedService,
          },
        ),
      )}
    >
      <p>{name}</p>
      <p className="text-success">{price}</p>
    </button>
  );
};
