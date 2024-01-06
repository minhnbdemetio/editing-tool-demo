export declare type LineType =
  | 'solid'
  | 'dashed'
  | 'dots'
  | 'closed'
  | 'end-triangle'
  | 'arrow-closed'
  | 'dots-closed-triangle'
  | 'line-closed-square'
  | 'line-closed-outline-square'
  | 'line-closed-rhombus'
  | 'line-closed-outline-rhombus'
  | 'line-closed-circle'
  | 'line-closed-outline-circle'
  | 'end-arrow'
  | 'dots-end-arrow'
  | 'dots-closed-triangle';

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
  {
    type: 'end-triangle',
    img: '/svgs/line-end-triangle.svg',
  },

  {
    type: 'end-arrow',
    img: '/svgs/line-end-arrow.svg',
  },
  {
    type: 'dots-end-arrow',
    img: '/svgs/dots-end-arrow.svg',
  },
  {
    type: 'closed',
    img: '/svgs/line-start-end.svg',
  },

  {
    type: 'arrow-closed',
    img: '/svgs/line-start-end-arrow.svg',
  },

  {
    type: 'dots-closed-triangle',
    img: '/svgs/dots-closed-triangle.svg',
  },
  {
    type: 'line-closed-circle',
    img: '/svgs/line-closed-circle.svg',
  },
  {
    type: 'line-closed-outline-circle',
    img: '/svgs/line-closed-outline-circle.svg',
  },
  {
    type: 'line-closed-rhombus',
    img: '/svgs/line-closed-rhombus.svg',
  },
  {
    type: 'line-closed-outline-rhombus',
    img: '/svgs/line-closed-outline-rhombus.svg',
  },
  {
    type: 'line-closed-square',
    img: '/svgs/line-closed-square.svg',
  },
  {
    type: 'line-closed-outline-square',
    img: '/svgs/line-closed-outline-square.svg',
  },
];
