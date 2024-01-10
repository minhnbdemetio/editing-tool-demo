import { CSSProperties, useCallback } from 'react';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useActivePage } from '../store/active-page';
import { GradientStop } from '../utilities/color.type';
import { parseTranslateString } from '../utilities/utils';
import { useAddObjectToPage, usePageObjectsById } from './usePageObjects';
import { isLine, isText } from '../utilities/moveable';
import { MoveableObject } from '../factories/MoveableObject';

export const useActiveTextObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isText(activeMoveableObject) ? activeMoveableObject : null;
};

export const useActiveMoveableLineObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isLine(activeMoveableObject) ? activeMoveableObject : null;
};

export const useUpdateFontSize = () => {
  const activeText = useActiveTextObject();

  return (fontSize: number) => {
    activeText?.setFontSize(fontSize);
  };
};

export const useUpdateTextColor = () => {
  const activeText = useActiveTextObject();

  return (color: string) => {
    activeText?.setTextColor(color);
  };
};

export const useUpdateTextGradientColor = () => {
  const activeText = useActiveTextObject();

  return (gradientStops: GradientStop[]) => {
    activeText?.setTextGradient(gradientStops);
  };
};

export const useDeleteObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);

  return useCallback(() => {
    if (!pageObjects || !setPageObjects || !activeMoveableObject) return false;

    const filteredObjects = pageObjects.filter(
      object => object.id !== activeMoveableObject.id,
    );
    activeMoveableObject?.destroy();
    setPageObjects(filteredObjects);

    return true;
  }, [activeMoveableObject, pageObjects, setPageObjects]);
};

export const useUndoDeleteObject = (deletedObject: MoveableObject) => {
  const addObjectToPage = useAddObjectToPage(deletedObject.pageId || null);

  return useCallback(() => {
    const recreatedObject = deletedObject.clone();
    if (recreatedObject) addObjectToPage(recreatedObject);

    return true;
  }, [addObjectToPage, deletedObject]);
};

export const useCloneObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  return () => {
    if (!pageObjects || !setPageObjects || !activeMoveableObject) return false;

    const clonedObject = activeMoveableObject.clone();

    setPageObjects([...pageObjects, clonedObject]);

    return true;
  };
};

export const useToggleMoveableBoldText = () => {
  const activeText = useActiveTextObject();
  return (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const fontWeight = activeText?.getCssProperty('fontWeight');
    const isBold = fontWeight === 'bold' || fontWeight === '700';
    if (isBold) {
      element.style.fontWeight = 'normal';
    } else {
      element.style.fontWeight = 'bold';
    }
    callback && callback();
    return true;
  };
};

export const useToggleItalicText = () => {
  const activeText = useActiveTextObject();

  return (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const isItalic = activeText?.getCssProperty('fontStyle') === 'italic';
    if (isItalic) {
      element.style.fontStyle = 'normal';
    } else {
      element.style.fontStyle = 'italic';
    }
    callback && callback();
    return true;
  };
};

export const useToggleUnderlineText = () => {
  const activeText = useActiveTextObject();

  const toggleUnderlineText = (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const textDecoration = activeText?.getCssProperty('textDecoration') || '';
    const isUnderlined = textDecoration.includes('underline');
    if (isUnderlined) {
      element.style.textDecoration =
        textDecoration === 'underline'
          ? 'none'
          : textDecoration.replace(/underline/g, '');
    } else if (textDecoration.includes('none')) {
      element.style.textDecoration = 'underline';
    } else {
      element.style.textDecoration += ' underline';
    }
    callback && callback();
    return true;
  };

  return toggleUnderlineText;
};

export const useToggleLineThroughText = () => {
  const activeText = useActiveTextObject();

  const toggleLineThroughText = (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const textDecoration = activeText?.getCssProperty('textDecoration') || '';
    const hasLineThrough = textDecoration.includes('line-through');
    if (hasLineThrough) {
      element.style.textDecoration =
        textDecoration === 'line-through'
          ? 'none'
          : textDecoration.replace(/line-through/g, '');
    } else if (textDecoration.includes('none')) {
      element.style.textDecoration = 'line-through';
    } else {
      element.style.textDecoration += ' line-through';
    }
    callback && callback();
    return true;
  };

  return toggleLineThroughText;
};

export const useToggleUppercaseText = () => {
  const activeText = useActiveTextObject();

  const toggleUppercaseText = (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const isUppercase =
      activeText?.getCssProperty('textTransform') === 'uppercase';

    if (isUppercase) {
      element.style.textTransform = 'none';
    } else {
      element.style.textTransform = 'uppercase';
    }
    callback && callback();
    return true;
  };

  return toggleUppercaseText;
};

export const useChangeTextAlign = () => {
  const activeText = useActiveTextObject();

  const changeTextAlign = (textAlign: string, callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.textAlign = textAlign;
    callback && callback();
    return true;
  };

  return changeTextAlign;
};

export const useToggleListTypeDiscText = () => {
  const activeText = useActiveTextObject();

  const toggleListTypeDiscText = (callback?: Function) => {
    const listElement = activeText?.getElement()?.querySelector('ul');
    if (!listElement) return false;
    const isListTypeDisc = listElement.style.listStyleType === 'disc';
    if (isListTypeDisc) {
      listElement.style.paddingLeft = '0';
      listElement.style.listStyleType = 'none';
    } else {
      listElement.style.paddingLeft = '20px';
      listElement.style.listStyleType = 'disc';
    }
    callback && callback();
    return true;
  };

  return toggleListTypeDiscText;
};

export const useToggleListTypeNumberText = () => {
  const activeText = useActiveTextObject();

  const toggleListTypeText = (callback?: Function) => {
    const listElement = activeText?.getElement()?.querySelector('ul');
    if (!listElement) return false;
    const isNumberType = listElement.style.listStyleType === 'number';

    if (isNumberType) {
      listElement.style.paddingLeft = '0';
      listElement.style.listStyleType = 'none';
    } else {
      listElement.style.paddingLeft = '20px';
      listElement.style.listStyleType = 'number';
    }
    callback && callback();
    return true;
  };

  return toggleListTypeText;
};

export const useChangeTextSpacing = () => {
  const activeText = useActiveTextObject();

  const handleChangeLetterSpacing = (fontSize: number, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.letterSpacing = `${fontSize}px`;
    callback();
    return true;
  };

  return handleChangeLetterSpacing;
};

export const useChangeTextLineHeight = () => {
  const activeText = useActiveTextObject();

  const handleChangeLineHeight = (lineHeight: number, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.lineHeight = `${lineHeight}px`;
    callback();
    return true;
  };

  return handleChangeLineHeight;
};

export const useChangeTextTransformOrigin = () => {
  const activeText = useActiveTextObject();

  const handleChangeTransformOrigin = (
    transformOrigin: CSSStyleDeclaration['transformOrigin'],
    callback?: Function,
  ) => {
    activeText?.changeTransformOrigin(transformOrigin);
    callback && callback();
    return true;
  };

  return handleChangeTransformOrigin;
};
type EditableCSSProperty = keyof Omit<
  CSSStyleDeclaration,
  | 'length'
  | 'parentRule'
  | keyof { [Symbol.iterator]: () => IterableIterator<string> }
  | keyof { [property: string]: () => string }
>;
export const useChangeTextStyles = () => {
  const activeText = useActiveTextObject();

  const handleChangeStyles = (
    styles: CSSStyleDeclaration,
    idStyles: string,
    callback: Function,
  ) => {
    const element = activeText?.getElement();
    if (!element) return false;
    for (const [key, value] of Object.entries(styles)) {
      element.style[key as EditableCSSProperty] = `${value}`;
    }
    element.setAttribute('stylesId', idStyles);
    callback();
    return true;
  };

  return handleChangeStyles;
};

export const useChangeTextFontStyle = () => {
  const activeText = useActiveTextObject();

  const handleChangeFont = (
    fontFamily: string,
    fontStyle: Partial<CSSProperties>,
    callback: Function,
  ) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.fontFamily = fontFamily;
    for (const [key, value] of Object.entries(fontStyle)) {
      (element.style as { [key: string]: any })[key] = `${value}`;
    }
    callback();
    return true;
  };

  return handleChangeFont;
};

export const useChangeTextTransform = () => {
  const activeText = useActiveTextObject();

  const handleChangeTransform = (
    transformX: number,
    transformY: number,
    callback: Function,
  ) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const beforeTransForm = parseTranslateString(element.style.transform);
    element.style.transform = `translate(${
      beforeTransForm.translateX + transformX
    }px, ${beforeTransForm.translateY + transformY}px)`;
    callback();
    return true;
  };

  return handleChangeTransform;
};
