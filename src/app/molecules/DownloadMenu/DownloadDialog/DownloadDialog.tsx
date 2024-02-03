import { BottomSheet } from '../../BottomSheet';
import { ModalBody, ModalHeader, ModalProps } from '@nextui-org/react';
import { ChevronLeft } from '@/app/icons';
import { MenuGroup } from '@/app/atoms/MenuGroup';
import { useState } from 'react';
import { DownloadOptionContent } from './DownloadOptionContent';
import { FileTypeContent } from './FileTypeContent';
import { SelectPageContent } from './SelectPageContent';

interface Props extends Omit<ModalProps, 'children'> {
  showActionMenu: () => void;
}

export const enum DownloadContentType {
  LIST_OPTIONS = 'list',
  FILE_TYPE = 'fileType',
  SELECT_PAGE = 'selectPage',
}

export const DownloadDialog = ({ showActionMenu, ...props }: Props) => {
  const [activeContent, setActiveContent] = useState<DownloadContentType>(
    DownloadContentType.LIST_OPTIONS,
  );

  const onBack = () => {
    switch (activeContent) {
      case DownloadContentType.LIST_OPTIONS: {
        return showActionMenu;
      }

      default: {
        return () => setActiveContent(DownloadContentType.LIST_OPTIONS);
      }
    }
  };

  const getActiveContent = () => {
    switch (activeContent) {
      case DownloadContentType.FILE_TYPE: {
        return <FileTypeContent />;
      }

      case DownloadContentType.SELECT_PAGE: {
        return <SelectPageContent />;
      }

      default: {
        return <DownloadOptionContent setActiveContent={setActiveContent} />;
      }
    }
  };

  return (
    <BottomSheet hideBackdrop {...props}>
      <MenuGroup className="py-0">
        <ModalHeader className="flex justify-center items-center text-default11 pt-3 pb-2 border-default9/15">
          <button onClick={onBack()} className="absolute left-3">
            <ChevronLeft className="w-4 h-4 stroke-2" />
          </button>
          <span className="text-primaryGray font-bold text-md leading-5">
            Download
          </span>
        </ModalHeader>

        <ModalBody className="px-4 pt-4 pb-8 gap-6">
          {getActiveContent()}
        </ModalBody>
      </MenuGroup>
    </BottomSheet>
  );
};
