import { FC, useState } from 'react';
import { Search, Setting } from '@/app/icons';
import { useOutsideClick } from '../../hooks/useClickOutside';
import { Badge, Button, Input } from '@nextui-org/react';
import { RecommendedComplete } from './RecommendedComplete';
import { RecommendedKeywords } from './RecommendedKeywords';
import { InputSetting, SettingFilterProps } from './InputSetting';

export interface SettingFilterGroupProps {
  name: string;
  settingFilter: SettingFilterProps[];
  type: SettingTypeEnum;
  key?: string;
}

export enum SettingTypeEnum {
  Format,
  Checkbox,
  CheckboxSingle,
}

export interface RecommendedKeywordsProps {
  onValueChange: (value: string) => void;
  recommendedKeywords: string[];
}

interface SearchInputProps {
  recommendedKeywords?: string[];
  hasSetting?: boolean;
  placeholder?: string;
  settingFilters?: SettingFilterGroupProps[];
  applyFilter?: (settingFilters: SettingFilterGroupProps[]) => void;
  onResetFilter?: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  recommendedKeywords = [],
  hasSetting = false,
  placeholder = '',
  settingFilters = [],
  applyFilter,
  onResetFilter,
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showRecommended, setShowRecommended] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');

  const ref = useOutsideClick(() => {
    setShowFilter(false);
    setShowRecommended(false);
  });

  const handleFocusInput = () => {
    setShowFilter(false);
    setShowRecommended(true);
  };

  const handleFocusSetting = () => {
    setShowFilter(true);
    setShowRecommended(false);
  };

  function countIsSelectTrue(data: SettingFilterGroupProps[]) {
    let count = 0;

    data.forEach(item => {
      if (item.settingFilter) {
        item.settingFilter.forEach(filter => {
          if (filter.isSelect === true) {
            count++;
          }
        });
      }
    });

    return count;
  }

  function findKeyword(keywords: string[], input: string): string[] {
    const inputLowerCase = input.toLowerCase();

    return keywords.filter(keyword =>
      keyword.toLowerCase().includes(inputLowerCase),
    );
  }
  const onValueChange = (value: string) => {
    setSearchKey(value);
  };
  const onApplyFilter = (setting: SettingFilterGroupProps[]) => {
    setShowFilter(false);
    applyFilter && applyFilter(setting);
  };

  return (
    <div className="relative" ref={ref}>
      <Input
        placeholder={placeholder}
        variant="bordered"
        size="sm"
        onFocus={() => handleFocusInput()}
        value={searchKey}
        onValueChange={onValueChange}
        startContent={<Search className="w-[20px] h-[20px]" />}
        endContent={
          hasSetting && (
            <Button
              isIconOnly
              color="primary"
              variant="light"
              onClick={() => handleFocusSetting()}
            >
              <Badge
                content={countIsSelectTrue(settingFilters)}
                size="md"
                color="primary"
              >
                <Setting className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-[20px] h-[20px]" />
              </Badge>
            </Button>
          )
        }
      />

      {showFilter && (
        <div className="w-full px-4 py-2 bg-white absolute right-0 top-12 rounded-md shadow-lg flex z-10">
          <InputSetting
            settingFilters={settingFilters}
            onApplyFilter={setting => onApplyFilter(setting)}
            onResetFilter={onResetFilter}
          />
        </div>
      )}

      {showRecommended && (
        <>
          {searchKey ? (
            <RecommendedComplete
              onValueChange={onValueChange}
              recommendedKeywords={findKeyword(
                recommendedKeywords,
                searchKey,
              ).slice(0, 5)}
            />
          ) : (
            <RecommendedKeywords
              onValueChange={onValueChange}
              recommendedKeywords={recommendedKeywords}
            />
          )}
        </>
      )}
    </div>
  );
};
