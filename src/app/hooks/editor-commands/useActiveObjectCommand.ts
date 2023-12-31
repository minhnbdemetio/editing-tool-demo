import {
  useChangeActiveObjectFontSize,
  useChangeTextColor,
  useCopyActiveObject,
  useDeleteActiveObject,
  useToggleBoldText,
  useToggleCapitalText,
  useToggleItalicText,
  useToggleStrokeText,
  useToggleUnderlineText,
} from '../useActiveObject';

import { useExecuteCommand } from './useCommand';

export const useCopyActiveObjectCommand = () => {
  const copyObjectFunction = useCopyActiveObject();
  return useExecuteCommand(copyObjectFunction);
};

export const useDeleteActiveObjectCommand = () => {
  const deleteObjectFunction = useDeleteActiveObject();
  return useExecuteCommand(deleteObjectFunction);
};

export const useChangeActiveObjectFontSizeCommand = () => {
  const changeFontSizeFunction = useChangeActiveObjectFontSize();
  return useExecuteCommand(changeFontSizeFunction, { debounce: true });
};

export const useToggleBoldTextCommand = () => {
  const toggleBoldTextFunction = useToggleBoldText();
  return useExecuteCommand(toggleBoldTextFunction);
};

export const useToggleItalicTextCommand = () => {
  const toggleItalicTextFunction = useToggleItalicText();
  return useExecuteCommand(toggleItalicTextFunction);
};

export const useToggleUnderlineTextCommand = () => {
  const toggleUnderlineTextFunction = useToggleUnderlineText();
  return useExecuteCommand(toggleUnderlineTextFunction);
};

export const useChangeTextColorCommand = () => {
  const changeTextColorFunction = useChangeTextColor();
  return useExecuteCommand(changeTextColorFunction, { debounce: true });
};

export const useToggleStrokeTextCommand = () => {
  const toggleStrokeTextFunction = useToggleStrokeText();
  return useExecuteCommand(toggleStrokeTextFunction);
};

export const useToggleCapitalTextCommand = () => {
  const toggleCapitalText = useToggleCapitalText();
  return useExecuteCommand(toggleCapitalText);
};
