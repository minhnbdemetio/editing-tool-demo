import SearchInput from '@/app/molecules/SearchInput';
import { FC, useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useActivePageCanvas } from '@/app/hooks/useActivePage';
import {
  BodyText,
  HeadingText,
  SubheadingText,
} from '@/app/factories/text-element';

const recommendedKeywords = [
  'Xuân',
  'Hạ',
  'Thu',
  'Đông',
  'Động vật',
  'Thời tiết',
  'Màu sắc',
];

export const TextMenuContent: FC = () => {
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const onSettingClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFilterAnchorEl(e.currentTarget);
    },
    [],
  );

  const activePageCanvas = useActivePageCanvas();

  const handleAddTitle = () => {
    const text = new HeadingText();
    activePageCanvas?.add(text);
  };
  const handleAddSubtitle = () => {
    const text = new SubheadingText();
    activePageCanvas?.add(text);
  };
  const handleAddBodyText = () => {
    const text = new BodyText();
    activePageCanvas?.add(text);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <SearchInput
        recommendedKeywords={recommendedKeywords}
        placeholder="Search fonts and combinations"
        hasSetting
        onClickSetting={onSettingClick}
      />
      <Button className="bg-green-500 text-white my-3">Add a text box</Button>
      <span className="mb-1">Tap text to add to page</span>
      <Button className="mb-3">Add your brand fonts</Button>
      <span className="mb-1">Default text styles</span>
      <Button onClick={handleAddTitle} className="mb-2">
        Add a heading
      </Button>
      <Button onClick={handleAddSubtitle} className="mb-2">
        Add a subheading
      </Button>
      <Button onClick={handleAddBodyText}>Add a little bit of body text</Button>
      <span className="mt-3">Font combinations</span>
    </div>
  );
};
