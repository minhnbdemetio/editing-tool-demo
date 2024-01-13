export const getCommentThreads = () => {
  return new Promise(res =>
    setTimeout(() => {
      const sizes: PageSize[] = [
        {
          id: 1,
          workingHeight: 1149,
          workingWidth: 841,
          unit: UNITS.MILLIMETER,
          width: 843,
          height: 1152,
          label: 'A0',
        },
        {
          id: 2,
          workingHeight: 841,
          workingWidth: 594,
          unit: UNITS.MILLIMETER,
          width: 596,
          height: 843,
          label: 'A1',
        },
        {
          id: 3,
          workingHeight: 594,
          workingWidth: 420,
          unit: UNITS.MILLIMETER,
          width: 422,
          height: 596,
          label: 'A2',
        },
        {
          id: 4,
          // workingHeight: 420,
          // workingWidth: 297,
          unit: UNITS.MILLIMETER,
          width: 297,
          height: 420,
          label: 'A3',
        },
      ];

      res(sizes);
    }, 1000),
  );
};
