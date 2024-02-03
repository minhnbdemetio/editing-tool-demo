import { DownloadOptionWrapper } from './DownloadOptionWrapper';
import { Button, Checkbox } from '@nextui-org/react';

type Props = {};

export const SelectPageContent = (props: Props) => {
  return (
    <div>
      <DownloadOptionWrapper label="Select Page" className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-md leading-5">All pages (1-4)</span>
          <Checkbox
            classNames={{
              wrapper: 'rounded before:rounded after:rounded w-4.5 h-4.5 mr-0',
            }}
          />
        </div>

        <div className="pl-2 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-md leading-5">Page 1</span>
            <Checkbox
              classNames={{
                wrapper:
                  'rounded before:rounded after:rounded w-4.5 h-4.5 mr-0',
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-md leading-5">Page 1</span>
            <Checkbox
              classNames={{
                wrapper:
                  'rounded before:rounded after:rounded w-4.5 h-4.5 mr-0',
              }}
            />
          </div>
        </div>
      </DownloadOptionWrapper>

      <Button color="primary" className="mt-8 w-full rounded-lg">
        Apply
      </Button>
    </div>
  );
};
