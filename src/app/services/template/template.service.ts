import { TemplateFilterType } from '../../types';
import { TemplateCategory, Template } from '@/app/services/template/template';

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

const mockTemplateData = {
  version: '5.3.0',
  objects: [
    {
      type: 'i-text',
      version: '5.3.0',
      originX: 'left',
      originY: 'top',
      left: 198,
      top: 210,
      width: 190.79,
      height: 22.6,
      fill: 'black',
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontSize: 20,
      text: 'TEMPLATE SAMPLE',
      underline: false,
      overline: false,
      linethrough: false,
      textAlign: 'left',
      fontStyle: 'normal',
      lineHeight: 1.16,
      textBackgroundColor: '',
      charSpacing: 0,
      styles: [],
      direction: 'ltr',
      path: null,
      pathStartOffset: 0,
      pathSide: 'left',
      pathAlign: 'baseline',
    },
    {
      type: 'image',
      version: '5.3.0',
      originX: 'left',
      originY: 'top',
      left: 123,
      top: 249.36,
      width: 536,
      height: 354,
      fill: 'rgb(0,0,0)',
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 0.68,
      scaleY: 0.68,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      cropX: 0,
      cropY: 0,
      src: 'http://localhost:3000/dog.jpg',
      crossOrigin: null,
      filters: [],
    },
  ],
};

const mockCategories: TemplateCategory[] = [
  {
    title: 'Banners',
    subCategories: [
      { title: 'Horizontal Banner' },
      { title: 'Vertical Banner' },
      { title: 'Vertical Posterized' },
      { title: 'Square Suspended' },
    ],
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
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
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
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
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
    ],
  },
  {
    title: 'Flyers',
    subCategories: [{ title: 'Double-sided' }, { title: 'Single-sided' }],
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
    ],
  },
  {
    title: 'Business cards 2',
    subCategories: [
      { title: 'Solid Horizontal 2' },
      { title: 'Solid Color Vertical 2' },
      { title: 'Horizontal 2' },
      { title: 'Vertical 2' },
    ],
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
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
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
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
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
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
    templates: [
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
      {
        thumbnail:
          'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
        data: mockTemplateData,
      },
    ],
  },
];
const mockTemplates: Template[] = [
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
  },
  {
    thumbnail:
      'https://file.miricanvas.com/template_thumb/2023/11/13/14/10/k9fjhmavgzcptxs9/thumb.png?size=350',
    data: mockTemplateData,
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
