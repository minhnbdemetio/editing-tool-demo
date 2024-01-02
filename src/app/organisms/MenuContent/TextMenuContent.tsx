import SearchInput from '@/app/molecules/SearchInput';
import { FC, useCallback, useState } from 'react';
import { Tabs, Tab, Card, CardBody, Button } from '@nextui-org/react';
import { useActivePageCanvas } from '@/app/hooks/useActivePage';
import { fabric } from 'fabric';

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
    const text = new fabric.IText('Add a heading', {
      left: 50,
      top: 50,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
    activePageCanvas?.add(text);
  };
  const handleAddSubtitle = () => {
    const text = new fabric.IText('Add a subheading', {
      left: 50,
      top: 50,
      fontSize: 15,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
    activePageCanvas?.add(text);
  };
  const handleAddBodyText = () => {
    const text = new fabric.IText('Add a body text', {
      left: 50,
      top: 50,
      fontSize: 10,
      fontFamily: 'Arial',
      fill: 'black',
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
    activePageCanvas?.add(text);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <SearchInput
        recommendedKeywords={recommendedKeywords}
        placeholder="Search templates"
        hasSetting
        onClickSetting={onSettingClick}
      />
      <Tabs className="mt-3" aria-label="Options">
        <Tab key="style" title="Style">
          <div className="flex flex-col gap-3">
            <Button onClick={handleAddTitle}>
              <div className="flex items-center justify-between">
                <span>Add title text</span>
              </div>
            </Button>
            <Button onClick={handleAddSubtitle}>Add subtitle text</Button>
            <Button onClick={handleAddBodyText}>Add body text</Button>
          </div>
        </Tab>
        <Tab key="font" title="Font">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="symbol" title="Symbol">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};
