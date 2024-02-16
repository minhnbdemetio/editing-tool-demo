import { ChevronRight } from '@/app/icons';
import { PngFile } from '@/app/icons/PngFile';
import { Button, ButtonProps } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { DownloadContentType } from '.';
import { DownloadOptionWrapper } from './DownloadOptionWrapper';

type Props = {
  setActiveContent: (type: DownloadContentType) => void;
};

const DownloadOption = ({ className, children, ...props }: ButtonProps) => (
  <Button
    variant="bordered"
    className={twMerge(
      'border border-border rounded justify-between px-3 w-full text-primaryGray',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="w-4.5 h-4.5 text-default12" />
  </Button>
);

export const DownloadOptionContent = ({ setActiveContent }: Props) => {
  return (
    <>
      <DownloadOptionWrapper label="File type">
        <DownloadOption
          onClick={() => setActiveContent(DownloadContentType.FILE_TYPE)}
        >
          <span className="flex items-center gap-1">
            <PngFile />
            <span>PNG</span>
          </span>
        </DownloadOption>
      </DownloadOptionWrapper>

      <DownloadOptionWrapper label="Select Page">
        <DownloadOption
          onClick={() => setActiveContent(DownloadContentType.SELECT_PAGE)}
        >
          <span>All pages (4)</span>
        </DownloadOption>
      </DownloadOptionWrapper>

      <Button color="primary" className="rounded-lg font-medium">
        Download
      </Button>
    </>
  );
};
