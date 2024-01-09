import {
  useToggleMoveableBoldText,
  useToggleMoveableLineThroughText,
  useToggleMoveableUppercaseText,
  useToggleMoveableUnderlineText,
  useToggleMoveableItalicText,
  useChangeMoveableTextAlign,
  useToggleMoveableListTypeDiscText,
  useToggleMoveableListTypeNumberText,
  useChangeMoveableTextSpacing,
  useChangeMoveableTextLineHeight,
  useChangeMoveableTextTransformOrigin,
  useChangeMoveableTextStyles,
  useChangeMoveableTextFontStyle,
  useChangeMoveableTextTransform,
} from '../useActiveMoveableObject';
import { debounce } from 'lodash';

// TODO: Add logic excute command
export const useToggleMoveableBoldTextCommand = () => {
  const toggleBoldText = useToggleMoveableBoldText();
  return toggleBoldText;
};

export const useToggleMoveableItalicTextCommand = () => {
  const toggleItalicText = useToggleMoveableItalicText();
  return toggleItalicText;
};

export const useToggleMoveableUnderlineTextCommand = () => {
  const toggleUnderlineText = useToggleMoveableUnderlineText();
  return toggleUnderlineText;
};

export const useToggleMoveableStrokeTextCommand = () => {
  const toggleStrokeText = useToggleMoveableLineThroughText();
  return toggleStrokeText;
};

export const useToggleMoveableCapitalTextCommand = () => {
  const toggleCapitalText = useToggleMoveableUppercaseText();
  return toggleCapitalText;
};

export const useChangeMoveableTextAligeCommand = () => {
  const changeTextAlige = useChangeMoveableTextAlign();
  return changeTextAlige;
};

export const useToggleMoveableListTypeDiscTextCommand = () => {
  const toggleListTypeDiscText = useToggleMoveableListTypeDiscText();
  return toggleListTypeDiscText;
};

export const useToggleMoveableListTypeNumberTextCommand = () => {
  const toggleListTypeNumberText = useToggleMoveableListTypeNumberText();
  return toggleListTypeNumberText;
};

export const useChangeMoveableTextSpacingCommand = () => {
  const changeLetterSpacing = useChangeMoveableTextSpacing();
  // TODO: Using excute command
  return debounce(changeLetterSpacing, 100);
};

export const useChangeMoveableTextLineHeightCommand = () => {
  const changeLineHeight = useChangeMoveableTextLineHeight();
  return debounce(changeLineHeight, 100);
};

export const useChangeMoveableTextTransformOriginCommand = () => {
  const changeTextTransformOrigin = useChangeMoveableTextTransformOrigin();
  return changeTextTransformOrigin;
};

export const useChangeMoveableTextStylesCommand = () => {
  const changeStyles = useChangeMoveableTextStyles();
  return changeStyles;
};

export const useChangeMoveableTextFontStyleCommand = () => {
  const changeFontStyle = useChangeMoveableTextFontStyle();
  return changeFontStyle;
};

export const useChangeMoveableTextTransformCommand = () => {
  const changeTransform = useChangeMoveableTextTransform();
  return debounce(changeTransform, 100);
};
