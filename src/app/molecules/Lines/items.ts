export declare type LineType =
  | 'solid'
  | 'dashed'
  | 'dots'
  | 'closed'
  | 'end-arrow'
  | 'arrow-closed';

export const Items: {
  type: LineType;
  img: string;
}[] = [
  {
    type: 'dots',
    img: '/svgs/dots-line.svg',
  },
  {
    type: 'closed',
    img: '/svgs/line-start-end.svg',
  },
  {
    type: 'dashed',
    img: '/svgs/dashed-line.svg',
  },
  {
    type: 'solid',
    img: '/svgs/solid-line.svg',
  },
  {
    type: 'end-arrow',
    img: '/svgs/line-end-arrow.svg',
  },
  {
    type: 'arrow-closed',
    img: '/svgs/line-start-end-arrow.svg',
  },
];
