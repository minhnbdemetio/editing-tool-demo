import React from 'react';
import { DownloadOptionWrapper } from './DownloadOptionWrapper';
import { PngFile } from '@/app/icons/PngFile';
import { PdfFile } from '@/app/icons/PdfFile';
import { Button } from '@nextui-org/react';

type Props = {};

export const FileTypeContent = (props: Props) => {
  return (
    <div>
      <DownloadOptionWrapper label="File type">
        <Button
          variant="bordered"
          className="text-primaryGray border border-border rounded-lg w-full flex justify-start items-start gap-2 py-4 h-auto"
        >
          <PngFile />
          <span className="flex flex-col gap-0.5 items-start">
            <span className="font-bold">PNG</span>
            <span className="text-smm leading-4">
              Best for complex images, illustrations
            </span>
          </span>
        </Button>

        <Button
          variant="bordered"
          className="text-primaryGray border border-border rounded-lg w-full flex justify-start items-start gap-2 py-4 h-auto"
        >
          <PdfFile />
          <span className="flex flex-col gap-0.5 items-start">
            <span className="font-bold">PDF</span>
            <span className="text-smm leading-4">Best for printing</span>
          </span>
        </Button>
      </DownloadOptionWrapper>
    </div>
  );
};
