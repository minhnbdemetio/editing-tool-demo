import { Template } from './types';
import { TemplateCategory } from './types/category';

const mockCategories: TemplateCategory[] = [
  {
    title: 'Banners',
    subCategories: [
      { title: 'Horizontal Banner' },
      { title: 'Vertical Banner' },
      { title: 'Vertical Posterized' },
      { title: 'Square Suspended' },
    ],
  },
  {
    title: 'Boxtape',
    subCategories: [
      { title: '10:1 Pattern' },
      { title: 'Narrow 10:1 Pattern' },
      { title: '2:1 Pattern' },
      { title: 'Narrow 2:1 Pattern' },
    ],
  },
  {
    title: 'Business cards',
    subCategories: [
      { title: 'Solid Horizontal' },
      { title: 'Solid Color Vertical' },
      { title: 'Horizontal' },
      { title: 'Vertical' },
    ],
  },
  {
    title: 'Flyers',
    subCategories: [{ title: 'Double-sided' }, { title: 'Single-sided' }],
  },
  {
    title: 'Business cards 2',
    subCategories: [
      { title: 'Solid Horizontal 2' },
      { title: 'Solid Color Vertical 2' },
      { title: 'Horizontal 2' },
      { title: 'Vertical 2' },
    ],
  },
  {
    title: 'Business cards 3',
    subCategories: [
      { title: 'Solid Horizontal 3' },
      { title: 'Solid Color Vertical 3' },
      { title: 'Horizontal 3' },
      { title: 'Vertical 3' },
    ],
  },
  {
    title: 'Business cards 4',
    subCategories: [
      { title: 'Solid Horizontal 4' },
      { title: 'Solid Color Vertical 4' },
      { title: 'Horizontal 4' },
      { title: 'Vertical 4' },
    ],
  },
  {
    title: 'Business cards 5',
    subCategories: [
      { title: 'Solid Horizontal 5' },
      { title: 'Solid Color Vertical 5' },
      { title: 'Horizontal 5' },
      { title: 'Vertical 5' },
    ],
  },
];

const mockTemplates: Template[] = [
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
  },
];

export const getCategories = () => {
  return new Promise<TemplateCategory[]>(resolve => {
    setTimeout(() => resolve(mockCategories), 1000);
  });
};

export const getCategoryTemplates = () => {
  return new Promise<Template[]>(resolve => {
    setTimeout(() => resolve(mockTemplates), 1000);
  });
};
