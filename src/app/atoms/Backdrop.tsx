import { twMerge } from 'tailwind-merge';

interface Props {
  open?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Backdrop = ({ open = true, onClick, className }: Props) => {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={twMerge(
        'absolute top-0 fadein z-20 left-0 w-full h-full bg-black/30',
        className,
      )}
    ></div>
  );
};
