import {
  useToggleMoveableBoldText,
  useToggleMoveableStrokeText,
  useToggleMoveableCapitalText,
  useToggleMoveableUnderlineText,
  useToggleMoveableItalicText,
  useChangeMoveableTextAlige,
  useToggleMoveableListTypeDiscText,
  useToggleMoveableListTypeNumberText,
} from '../useActiveMoveableObject';

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
  const toggleStrokeText = useToggleMoveableStrokeText();
  return toggleStrokeText;
};

export const useToggleMoveableCapitalTextCommand = () => {
  const toggleCapitalText = useToggleMoveableCapitalText();
  return toggleCapitalText;
};

export const useChangeMoveableTextAligeCommand = () => {
  const changeTextAlige = useChangeMoveableTextAlige();
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
