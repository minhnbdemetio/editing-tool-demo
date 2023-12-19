export const getToolBarHorizontalCenterPosition = (
  targetObject: fabric.Object,
  toolbarEl: HTMLDivElement,
) => {
  const targetBoundingRect = targetObject.getBoundingRect();
  const left = targetBoundingRect.left;
  const targetWidth = targetBoundingRect.width;

  const toolbarWidth = toolbarEl.clientWidth;

  return left + targetWidth / 2 - toolbarWidth / 2;
};

const TOOLBAR_VERTICAL_OFFSET = 30;

export const getToolBarVerticalPosition = (
  targetObject: fabric.Object,
  toolbarEl: HTMLDivElement,
  position: 'top' | 'bottom',
) => {
  const targetBoundingRect = targetObject.getBoundingRect();
  const top = targetBoundingRect.top;
  const targetHeight = targetBoundingRect.height;

  const toolbarHeight = toolbarEl.clientHeight;

  return position === 'top'
    ? top - toolbarHeight - TOOLBAR_VERTICAL_OFFSET
    : top + targetHeight + TOOLBAR_VERTICAL_OFFSET;
};
