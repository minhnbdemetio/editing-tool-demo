import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useActivePage } from '../store/active-page';
import { GradientStop } from '../utilities/color.type';
import { isText } from '../utilities/moveable';
import { usePageObjectsById } from './usePageObjects';

export const useActiveMoveableTextObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isText(activeMoveableObject) ? activeMoveableObject : null;
};

export const useUpdateActiveMoveableObjectFontSize = () => {
  const activeText = useActiveMoveableTextObject();

  return (fontSize: number) => {
    activeText?.setFontSize(fontSize);
  };
};

export const useUpdateTextColor = () => {
  const activeText = useActiveMoveableTextObject();

  return (color: string) => {
    activeText?.setTextColor(color);
  };
};

export const useUpdateTextGradientColor = () => {
  const activeText = useActiveMoveableTextObject();

  return (gradientStops: GradientStop[]) => {
    activeText?.setTextGradient(gradientStops);
  };
};

export const useDeleteActiveMoveableObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  return () => {
    if (!pageObjects || !setPageObjects || !activeMoveableObject) return false;

    const filteredObjects = pageObjects.filter(
      object => object.id !== activeMoveableObject.id,
    );
    activeMoveableObject?.destroy();
    setPageObjects(filteredObjects);

    return true;
  };
};

export const useCloneActiveMoveableObject = () => {
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
  const { activeMoveableObject } = useActiveMoveableObject();
  return (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    const isBold = element?.style?.fontWeight === 'bold';
    if (isBold) {
      element.style.fontWeight = 'normal';
    } else {
      element.style.fontWeight = 'bold';
    }
    callback && callback();
    return true;
  };
};

export const useToggleMoveableItalicText = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    const isItalic = element.style.fontStyle === 'italic';
    if (isItalic) {
      element.style.fontStyle = 'normal';
    } else {
      element.style.fontStyle = 'italic';
    }
    callback && callback();
    return true;
  };
};

export const useToggleMoveableUnderlineText = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const toggleUnderlineText = (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    const textDecoration = element.style.textDecoration;
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

export const useToggleMoveableLineThroughText = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const toggleStrokeText = (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    const textDecoration = element.style.textDecoration;
    const isStroke = textDecoration.includes('line-through');
    if (isStroke) {
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

  return toggleStrokeText;
};

export const useToggleMoveableCapitalText = () => {
  const activeMoveableObject = useActiveMoveableTextObject();

  const toggleCapitalText = (callback?: Function) => {
    const element = activeMoveableObject?.getElement();
    if (!element) return false;
    const isCapitalized =
      activeMoveableObject?.getCssProperty('textTransform') === 'uppercase';

    if (isCapitalized) {
      element.style.textTransform = 'none';
    } else {
      element.style.textTransform = 'uppercase';
    }
    callback && callback();
    return true;
  };

  return toggleCapitalText;
};

export const useChangeMoveableTextAlign = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const changeTextAlign = (textAlign: string, callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    element.style.textAlign = textAlign;
    callback && callback();
    return true;
  };

  return changeTextAlign;
};

export const useToggleMoveableListTypeDiscText = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const toggleListTypeDiscText = (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const listElement = activeMoveableObject.getElement()?.querySelector('ul');
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

export const useToggleMoveableListTypeNumberText = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const toggleListTypeText = (callback?: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const listElement = activeMoveableObject.getElement()?.querySelector('ul');
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

export const useChangeMoveableTextSpacing = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const handleChangeLetterSpacing = (fontSize: number, callback: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    element.style.letterSpacing = `${fontSize}px`;
    callback();
    return true;
  };

  return handleChangeLetterSpacing;
};

export const useChangeMoveableTextLineHeight = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const handleChangeLineHeight = (lineHeight: number, callback: Function) => {
    if (!isText(activeMoveableObject)) return false;
    const element = activeMoveableObject.getElement();
    if (!element) return false;
    element.style.lineHeight = `${lineHeight}px`;
    callback();
    return true;
  };

  return handleChangeLineHeight;
};

export const useChangeMoveableTextTransformOrigin = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const handleChangeTransformOrigin = (
    transformOrigin: CSSStyleDeclaration['transformOrigin'],
    callback?: Function,
  ) => {
    if (!isText(activeMoveableObject)) return false;
    activeMoveableObject.changeTransformOrigin(transformOrigin);
    callback && callback();
    return true;
  };

  return handleChangeTransformOrigin;
};
