import { Button } from '@/app/atoms/Button';
import { DownloadOptionWrapper } from './DownloadOptionWrapper';
import { Checkbox } from '@nextui-org/react';
import { usePages } from '@/app/hooks/usePage';
import { useState } from 'react';

type Props = {
  selectedPages: string[];
  setSelectedPages: (selectedPages: string[]) => void;
  onBack: () => void;
};

export const SelectPageContent = ({
  selectedPages,
  setSelectedPages,
  onBack,
}: Props) => {
  const pages = usePages();
  const [isSelectAll, setIsSelectAll] = useState(
    () => selectedPages.length === pages.length,
  );

  const onSelectItem = (page: string) => {
    let newSelectedPages = selectedPages;

    if (selectedPages.includes(page)) {
      newSelectedPages = newSelectedPages.filter(pg => pg !== page);
    } else {
      newSelectedPages = [...newSelectedPages, page];
    }

    setIsSelectAll(newSelectedPages.length === pages.length);
    setSelectedPages(newSelectedPages);
  };

  const onSelectAll = () => {
    if (isSelectAll) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pages);
    }

    setIsSelectAll(!isSelectAll);
  };

  return (
    <div>
      <DownloadOptionWrapper label="Select Page" className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-md leading-5">
            All pages (1-{pages.length})
          </span>
          <Checkbox
            isSelected={isSelectAll}
            onChange={onSelectAll}
            classNames={{
              wrapper: 'rounded before:rounded after:rounded w-4.5 h-4.5 mr-0',
            }}
          />
        </div>

        <div className="pl-2 space-y-4">
          {pages.map((page, idx) => (
            <div className="flex justify-between items-center" key={page}>
              <span className="text-md leading-5">Page {idx + 1}</span>
              <Checkbox
                isSelected={selectedPages.includes(page)}
                onChange={() => onSelectItem(page)}
                classNames={{
                  wrapper:
                    'rounded before:rounded after:rounded w-4.5 h-4.5 mr-0',
                }}
              />
            </div>
          ))}
        </div>
      </DownloadOptionWrapper>

      <Button
        color="primary"
        className="mt-8 w-full rounded-lg font-medium"
        onClick={onBack}
      >
        Apply
      </Button>
    </div>
  );
};
