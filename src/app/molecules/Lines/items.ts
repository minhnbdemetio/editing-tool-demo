export declare type LineType = 'solid' | 'dashed' | 'dots';

export const Items: {
  type: LineType;
  img: string;
}[] = [
  {
    type: 'solid',
    img: '/svgs/solid-line.svg',
  },
  {
    type: 'dashed',
    img: '/svgs/dashed-line.svg',
  },
  {
    type: 'dots',
    img: '/svgs/dots-line.svg',
  },
];
