import { DownloadOptionWrapper } from './DownloadOptionWrapper';
import { PngFile } from '@/app/icons/PngFile';
import { Button } from '@nextui-org/react';
import { FILE_TYPES, FileType } from './items';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Props = {
  selectedFileType: FileType;
  onSelect: (type: FileType) => void;
};

export const FileTypeContent = ({ selectedFileType, onSelect }: Props) => {
  return (
    <div>
      <DownloadOptionWrapper label="File type">
        {FILE_TYPES.map(type => (
          <Button
            key={type.value}
            variant="bordered"
            className={twMerge(
              clsx(
                'text-primaryGray border border-border rounded-lg w-full flex justify-start items-start gap-2 py-4 h-auto',
                {
                  'border-primary1 bg-tertiary/20':
                    selectedFileType.value === type.value,
                },
              ),
            )}
            onClick={() => onSelect(type)}
          >
            <PngFile />
            <span className="flex flex-col gap-0.5 items-start">
              <span className="font-bold">{type.label}</span>
              <span className="text-smm leading-4">{type.description}</span>
            </span>
          </Button>
        ))}
      </DownloadOptionWrapper>
    </div>
  );
};
