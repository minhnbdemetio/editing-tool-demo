import { ChevronRight } from '@/app/icons';
import { ButtonProps } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { DownloadContentType } from '.';
import { DownloadOptionWrapper } from './DownloadOptionWrapper';
import { Button } from '@/app/atoms/Button';
import { FileType } from './items';

type Props = {
  selectedPages: string[];
  selectedFileType: FileType;
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

export const DownloadOptionContent = ({
  selectedPages,
  selectedFileType,
  setActiveContent,
}: Props) => {
  const FileTypeIcon = selectedFileType.icon;

  return (
    <>
      <DownloadOptionWrapper label="File type">
        <DownloadOption
          onClick={() => setActiveContent(DownloadContentType.FILE_TYPE)}
          className="flex"
        >
          <span className="flex items-center gap-1">
            <FileTypeIcon />
            <span>{selectedFileType.label}</span>
          </span>
        </DownloadOption>
      </DownloadOptionWrapper>

      <DownloadOptionWrapper label="Select Page">
        <DownloadOption
          onClick={() => setActiveContent(DownloadContentType.SELECT_PAGE)}
          className="flex"
        >
          <span>All pages ({selectedPages.length})</span>
        </DownloadOption>
      </DownloadOptionWrapper>

      <Button color="primary" className="rounded-lg font-medium">
        Download
      </Button>
    </>
  );
};
