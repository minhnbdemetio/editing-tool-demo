import { FC } from 'react';

export interface SettingFilterProps {
  key: string;
  icon?: FC<{ className?: string }>;
  label?: string;
  value?: string;
  isSelect?: boolean;
}

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
  Color,
}

export interface RecommendedKeywordsProps {
  onValueChange: (value: string) => void;
  recommendedKeywords: string[];
}

export const DefaultInput = 'default-input';
