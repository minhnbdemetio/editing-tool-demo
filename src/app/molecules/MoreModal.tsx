import React from 'react';
import { FilePopoverContent } from './FilePopoverContent';
import { BottomSheet, BottomSheetProps } from '../atoms/BottomSheet';

interface MoreModalProps extends BottomSheetProps {}

export const MoreModal: React.FC<MoreModalProps> = props => {
  return (
    <BottomSheet
      className="[&:not(:has(.file-popover-content))]:hidden"
      {...props}
    >
      <FilePopoverContent className="file-popover-content" />
    </BottomSheet>
  );
};
