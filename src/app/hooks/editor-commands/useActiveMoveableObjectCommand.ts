import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import {
  useToggleMoveableBoldText,
  useToggleLineThroughText,
  useToggleUppercaseText,
  useToggleUnderlineText,
  useToggleItalicText,
  useChangeTextAlign,
  useToggleListTypeDiscText,
  useToggleListTypeNumberText,
  useChangeTextSpacing,
  useChangeTextLineHeight,
  useChangeTextTransformOrigin,
  useChangeTextStyles,
  useChangeTextFontStyle,
  useChangeObjectTransform,
  useDeleteObject,
  useUndoDeleteObject,
  useUpdateActiveTextShapeEffect,
  useUpdateElementOpacity,
} from '../useActiveMoveableObject';
import { debounce } from 'lodash';
import { DeleteCommand } from '@/app/lib/command/DeleteCommand';
import { useExecuteCommand } from './useCommand';

export const useChangeMoveableTextSpacingCommand = () => {
  const changeLetterSpacing = useChangeTextSpacing();
  // TODO: Using excute command
  return changeLetterSpacing;
};

export const useChangeMoveableTextLineHeightCommand = () => {
  const changeLineHeight = useChangeTextLineHeight();
  return debounce(changeLineHeight, 100);
};

export const useChangeMoveableTextTransformOriginCommand = () => {
  const changeTextTransformOrigin = useChangeTextTransformOrigin();
  return changeTextTransformOrigin;
};

export const useChangeMoveableTextStylesCommand = () => {
  const changeStyles = useChangeTextStyles();
  return changeStyles;
};

export const useChangeMoveableTextFontStyleCommand = () => {
  const changeFontStyle = useChangeTextFontStyle();
  return changeFontStyle;
};

export const useChangeMoveableElementTransformCommand = () => {
  const changeTransform = useChangeObjectTransform();
  return debounce(changeTransform, 100);
};

export const useDeleteObjetCommand = () => {
  const { getActiveMoveableObject } = useActiveMoveableObject();
  const activeMoveableObject = getActiveMoveableObject();
  const deleteFunction = useDeleteObject();
  const undoDeleteFunction = useUndoDeleteObject();

  const deleteCommand = new DeleteCommand({
    actionFunction: deleteFunction,
    undoFunction: undoDeleteFunction,
    redoFunction: deleteFunction,
  });
  deleteCommand.setDeletedObject(activeMoveableObject);
  return useExecuteCommand(deleteCommand);
};

export const useUpdateActiveTextShapeEffectCommand = () => {
  const updateActiveTextShapeEffect = useUpdateActiveTextShapeEffect();
  return updateActiveTextShapeEffect;
};

export const useChangeMoveableElementOpacityCommand = () => {
  const changeOpacity = useUpdateElementOpacity();
  return debounce(changeOpacity, 100);
};
