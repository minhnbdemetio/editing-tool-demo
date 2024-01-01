import { findKeyword } from '@/app/utilities/utils';
import { countIsSelectTrue } from './index';
import { SettingFilterGroupProps, SettingTypeEnum } from './searchInput';

describe('findKeyword', () => {
  it('should return an array of keywords that include the input', () => {
    const keywords = ['hello', 'world', 'foo', 'bar'];
    const input = 'o';
    const expected = ['hello', 'world', 'foo'];
    expect(findKeyword(keywords, input)).toEqual(expected);
  });

  it('should return an empty array if no keywords include the input', () => {
    const keywords = ['hello', 'world', 'foo', 'bar'];
    const input = 'z';
    const expected: any[] = [];
    expect(findKeyword(keywords, input)).toEqual(expected);
  });

  it('should be case insensitive', () => {
    const keywords = ['Hello', 'World', 'Foo', 'Bar'];
    const input = 'L';
    const expected = ['Hello', 'World'];
    expect(findKeyword(keywords, input)).toEqual(expected);
  });
});

describe('SearchInput functions', () => {
  describe('countIsSelectTrue', () => {
    it('should return the count of items where isSelect is true', () => {
      const data: SettingFilterGroupProps[] = [
        {
          name: 'Group 1',
          type: SettingTypeEnum.Checkbox,
          settingFilter: [
            { key: 'filter1', isSelect: true },
            { key: 'filter2', isSelect: false },
            { key: 'filter3', isSelect: true },
          ],
        },
        {
          name: 'Group 2',
          type: SettingTypeEnum.CheckboxSingle,
          settingFilter: [
            { key: 'filter1', isSelect: false },
            { key: 'filter2', isSelect: true },
          ],
        },
      ];
      const expected = 3;
      expect(countIsSelectTrue(data)).toEqual(expected);
    });

    it('should return 0 if no items have isSelect as true', () => {
      const data: SettingFilterGroupProps[] = [
        {
          name: 'Group 1',
          type: SettingTypeEnum.Checkbox,
          settingFilter: [
            { key: 'filter1', isSelect: false },
            { key: 'filter2', isSelect: false },
            { key: 'filter3', isSelect: false },
          ],
        },
        {
          name: 'Group 2',
          type: SettingTypeEnum.CheckboxSingle,
          settingFilter: [
            { key: 'filter1', isSelect: false },
            { key: 'filter2', isSelect: false },
          ],
        },
      ];
      const expected = 0;
      expect(countIsSelectTrue(data)).toEqual(expected);
    });
  });
});
