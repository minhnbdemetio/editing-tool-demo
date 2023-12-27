import { TemplateFilterType } from '../types';

export const getFilterOptions = async (): Promise<TemplateFilterType[]> => {
  const templates: TemplateFilterType[] = [
    {
      id: 1,
      type: 'color',
      colors: [
        'rgb(255, 82, 82)',
        'rgb(255, 158, 72)',
        'rgb(254, 230, 13)',
        'rgb(169, 234, 46)',
        'rgb(13, 200, 77)',
        'rgb(147, 242, 221)',
        'rgb(56, 128, 255)',
        'rgb(47, 65, 249)',
        'rgb(153, 94, 255)',
        'rgb(255, 132, 234)',
        'rgb(255, 255, 255)',
        'rgb(191, 191, 191)',
        'rgb(0, 0, 0)',
      ],
    },
    {
      id: 2,
      type: 'price',
      prices: [
        { label: 'Cheap', id: 1 },
        { label: 'Normal', id: 2 },
        { label: 'High-end', id: 3 },
      ],
    },
  ];

  return new Promise(res =>
    setTimeout(() => {
      res(templates);
    }, 1000),
  );
};
