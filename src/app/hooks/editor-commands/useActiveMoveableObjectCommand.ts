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
  useUpdateActiveMoveableObjectTextStyleEffect,
  useUpdateActiveTextShapeEffect,
} from '../useActiveMoveableObject';
import { debounce } from 'lodash';
import { DeleteCommand } from '@/app/factories/command/DeleteCommand';
import { useExecuteCommand } from './useCommand';

// TODO: Add logic excute command
export const useToggleMoveableBoldTextCommand = () => {
  const toggleBoldText = useToggleMoveableBoldText();
  return toggleBoldText;
};

export const useToggleMoveableItalicTextCommand = () => {
  const toggleItalicText = useToggleItalicText();
  return toggleItalicText;
};

export const useToggleMoveableUnderlineTextCommand = () => {
  const toggleUnderlineText = useToggleUnderlineText();
  return toggleUnderlineText;
};

export const useToggleMoveableStrokeTextCommand = () => {
  const toggleStrokeText = useToggleLineThroughText();
  return toggleStrokeText;
};

export const useToggleMoveableCapitalTextCommand = () => {
  const toggleCapitalText = useToggleUppercaseText();
  return toggleCapitalText;
};

export const useChangeMoveableTextAligeCommand = () => {
  const changeTextAlige = useChangeTextAlign();
  return changeTextAlige;
};

export const useToggleMoveableListTypeDiscTextCommand = () => {
  const toggleListTypeDiscText = useToggleListTypeDiscText();
  return toggleListTypeDiscText;
};

export const useToggleMoveableListTypeNumberTextCommand = () => {
  const toggleListTypeNumberText = useToggleListTypeNumberText();
  return toggleListTypeNumberText;
};

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

export const useChangeMoveableTextTransformCommand = () => {
  const changeTransform = useChangeObjectTransform();
  return debounce(changeTransform, 100);
};

export const useUpdateActiveMoveableObjectTextStyleEffectCommand = () => {
  const updateActiveMoveableObjectTextStyleEffect =
    useUpdateActiveMoveableObjectTextStyleEffect();
  return updateActiveMoveableObjectTextStyleEffect;
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
