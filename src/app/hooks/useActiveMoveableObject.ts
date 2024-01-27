import { CSSProperties, useCallback } from 'react';
import {
  MoveableTextShapeEffect,
  MoveableTextStyleEffect,
  TransformDirection,
} from '../lib/moveable/text/MoveableText';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useActivePage } from '../store/active-page';
import { GradientStop } from '../utilities/color.type';
import { parseTransformString } from '../utilities/utils';
import { isLine, isPhoto, isText } from '../utilities/moveable';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { useDesign } from '../store/design-objects';
import { isNumber } from 'lodash';
import { GradientMask } from '../lib/moveable/photo/gradient-mask/GradientMask';
import { PhotoPosition } from '../lib/moveable/photo/Croppable';

export const useActiveTextObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isText(activeMoveableObject) ? activeMoveableObject : null;
};

export const useActivePhotoObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  return isPhoto(activeMoveableObject) ? activeMoveableObject : null;
};

export const useActiveMoveableLineObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isLine(activeMoveableObject) ? activeMoveableObject : null;
};
export const useActiveMoveablePhotoObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isPhoto(activeMoveableObject) ? activeMoveableObject : null;
};

export const useCopyActiveObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return useCallback(() => {
    if (activeMoveableObject) {
      navigator.clipboard.writeText(activeMoveableObject?.id);
      return true;
    }
    return false;
  }, [activeMoveableObject]);
};

export const usePasteObject = () => {
  const { getAllObjects, setPageObjects } = useDesign();

  return useCallback(async () => {
    const allObjects = getAllObjects();
    const copiedObjectId = await navigator.clipboard.readText();
    const copiedObject = allObjects.find(
      object => object.id === copiedObjectId,
    );

    if (copiedObject) {
      const clonedObject = copiedObject.clone();
      clonedObject.setPageId(copiedObject.pageId);
      setPageObjects(copiedObject?.pageId || '', [...allObjects, clonedObject]);
      return true;
    }

    return false;
  }, [getAllObjects, setPageObjects]);
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
  const {
    getMoveableTargets,
    setMoveableTargets,
    getPageObjects,
    setPageObjects: setDesignObjects,
  } = useDesign();

  return useCallback(
    (shouldDeleteObject: MoveableObject | null) => {
      if (!shouldDeleteObject || !shouldDeleteObject.pageId) return false;
      const pageObjects = getPageObjects(shouldDeleteObject.pageId);
      const moveableTargets = getMoveableTargets();
      const filteredObjects = pageObjects.filter(
        object => object.id !== shouldDeleteObject.id,
      );
      const filteredTargets = moveableTargets.filter(
        element => element.id !== shouldDeleteObject.id,
      );
      shouldDeleteObject.toHtmlString();
      setMoveableTargets(filteredTargets);
      setDesignObjects(shouldDeleteObject.pageId || '', filteredObjects);

      return shouldDeleteObject;
    },
    [getPageObjects, getMoveableTargets, setMoveableTargets, setDesignObjects],
  );
};

export const useUndoDeleteObject = () => {
  const { getPageObjects, setPageObjects } = useDesign();

  return useCallback(
    (deletedObject: MoveableObject | null) => {
      if (!deletedObject || !deletedObject.pageId) return false;
      const recreatedObject = deletedObject.clone({
        htmlString: deletedObject.htmlString!,
        id: deletedObject.id,
      });
      recreatedObject.setPageId(deletedObject.pageId);
      const pageObjects = getPageObjects(deletedObject.pageId);
      setPageObjects(deletedObject.pageId, [...pageObjects, recreatedObject]);

      return recreatedObject;
    },
    [getPageObjects, setPageObjects],
  );
};

export const useCloneObject = () => {
  const { getActiveMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const { getPageObjects, setPageObjects } = useDesign();
  return () => {
    const activeMoveableObject = getActiveMoveableObject();
    if (!activePage || !activeMoveableObject) return false;
    const pageObjects = getPageObjects(activePage);

    const clonedObject = activeMoveableObject.clone();

    setPageObjects(activePage, [...pageObjects, clonedObject]);

    return true;
  };
};

export const useToggleMoveableBoldText = () => {
  const activeText = useActiveTextObject();
  return (callback?: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const fontWeight = activeText?.getElementCss('fontWeight');
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
    const isItalic = activeText?.getElementCss('fontStyle') === 'italic';
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
    const textDecoration = activeText?.getElementCss('textDecoration') || '';
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
    const textDecoration = activeText?.getElementCss('textDecoration') || '';
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
      activeText?.getElementCss('textTransform') === 'uppercase';

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
    activeText?.setLineHeight(lineHeight);
    callback();
    return true;
  };

  return handleChangeLineHeight;
};

export const useChangeTextTransformOrigin = () => {
  const activeText = useActiveTextObject();

  const handleChangeTransformOrigin = (
    transformDirection: TransformDirection,
    callback?: Function,
  ) => {
    activeText?.changeTransformOrigin(transformDirection);
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

export const useChangeObjectTransform = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const handleChangeTransform = (
    translateX?: number,
    translateY?: number,
    callback?: Function,
  ) => {
    const element = activeMoveableObject?.getElement();
    if (!element) return false;
    const transformString = parseTransformString(element.style.transform);
    element.style.transform = `translate(${
      isNumber(translateX) ? translateX + 'px' : transformString.translateX
    }, ${
      isNumber(translateY) ? translateY + 'px' : transformString.translateY
    }) rotate(${transformString.rotate})`;
    callback && callback();
    return true;
  };

  return handleChangeTransform;
};

export const useChangeTextWidth = () => {
  const activeText = useActiveTextObject();
  const handleChangeWidth = (width: string, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.width = width;
    callback();
    return true;
  };

  return handleChangeWidth;
};
export const useChangeTextHeight = () => {
  const activeText = useActiveTextObject();
  const handleChangeHeight = (height: string, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.style.height = height;
    callback();
    return true;
  };

  return handleChangeHeight;
};
export const useChangeTextLockSize = () => {
  const activeText = useActiveTextObject();
  const handleChangeLockSize = (lockSize: number, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    element.setAttribute('lockSizeId', lockSize.toString());
    callback();
    return true;
  };

  return handleChangeLockSize;
};
export const useChangeTextRotate = () => {
  const activeText = useActiveTextObject();
  const changeTextRotate = (rotate: string, callback: Function) => {
    const element = activeText?.getElement();
    if (!element) return false;
    const transformString = parseTransformString(element.style.transform);
    element.style.transform = `${transformString.translate} rotate(${rotate}deg)`;
    callback();
    return true;
  };

  return changeTextRotate;
};

export const useToggleLock = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const toggleLock = () => {
    activeMoveableObject?.toggleLock();
  };
  return toggleLock;
};

export const useUpdateActiveMoveableObjectTextStyleEffect = () => {
  const activeText = useActiveTextObject();
  const handleChangeTextEffect = (
    effect: MoveableTextStyleEffect,
    cb: Function,
  ) => {
    // Reset effect before apply new effect
    const el = activeText?.getElement();
    if (!el) return false;
    el.style.textShadow = 'none';
    el.style.webkitTextFillColor = 'currentcolor';
    el.style.caretColor = 'unset';
    el.style.webkitTextStroke = 'unset';
    el.style.webkitTextFillColor = 'unset';
    el.style.filter = 'unset';
    const outlineElement = document.getElementById(`outline-${activeText?.id}`);
    const backgroundElement = document.getElementById(
      `bg-effect-${activeText?.id}`,
    );
    if (outlineElement) {
      el.removeChild(outlineElement);
    }
    if (backgroundElement) {
      el.removeChild(backgroundElement);
    }
    const preColor = el.style.getPropertyValue('--prev-color');
    if (preColor) {
      el.style.color = preColor;
      el.style.removeProperty('--prev-color');
    }

    // Set style effect id
    activeText?.setStyleEffect(effect);
    cb();
    return true;
  };
  return handleChangeTextEffect;
};

export const useUpdateActiveTextShapeEffect = () => {
  const activeText = useActiveTextObject();
  const handleChangeTextEffect = (
    effect: MoveableTextShapeEffect,
    cb: Function,
  ) => {
    if (!activeText) return false;
    const element = activeText?.getElement();
    if (!element) return false;
    const isCurveEffect = activeText?.shapeEffect === 'curve';
    activeText?.setShapeEffect(effect);

    if (isCurveEffect) {
      activeText.setShapeNone();
    } else {
      activeText.setShapeEffect(effect);
    }

    cb();
    return true;
  };
  return handleChangeTextEffect;
};

export const useUpdateOpacity = () => {
  const activeText = useActiveTextObject();
  const handleChangeTextEffect = (opacity: number, cb: Function) => {
    if (!activeText) return false;
    activeText.setOpacity(opacity);

    cb();
    return true;
  };
  return handleChangeTextEffect;
};

export const useAlignElement = () => {
  const updateTransform = useChangeObjectTransform();
  const { activeMoveableObject } = useActiveMoveableObject();

  const { moveable, scale } = useDesign();
  return (
    direction: 'left' | 'top' | 'right' | 'bottom' | 'center' | 'middle',
  ) => {
    const element = activeMoveableObject?.getElement();
    if (!element || !moveable || !activeMoveableObject?.pageId) return;
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;
    const scaledElementWidth = element.clientWidth * scale;
    const scaledElementHeight = element.clientHeight * scale;
    const moveableRect = moveable.getRect();
    const pageContainer = document.getElementById(activeMoveableObject.pageId);

    if (!pageContainer) return;
    const pageWidth = pageContainer.clientWidth;
    const pageHeight = pageContainer.clientHeight;

    switch (direction) {
      case 'left': {
        const translateXToUpdate =
          (moveableRect.width - scaledElementWidth) / 2 / scale;
        updateTransform(Math.round(translateXToUpdate));
        break;
      }
      case 'top': {
        const translateYToUpdate =
          (moveableRect.height - scaledElementHeight) / 2 / scale;
        updateTransform(undefined, Math.round(translateYToUpdate));
        break;
      }
      case 'right': {
        const redundantX =
          (moveableRect.width - scaledElementWidth) / 2 / scale;
        const shouldTranslateX = pageWidth - elementWidth - redundantX;

        updateTransform(Math.round(shouldTranslateX));
        break;
      }
      case 'bottom': {
        const redundantY =
          (moveableRect.height - scaledElementHeight) / 2 / scale;

        const shouldTranslateY = pageHeight - elementHeight - redundantY;
        updateTransform(undefined, Math.round(shouldTranslateY));
        break;
      }
      case 'center': {
        const centerX = (pageWidth - elementWidth) / 2;
        const centerY = (pageHeight - elementHeight) / 2;
        updateTransform(Math.round(centerX), Math.round(centerY));
        break;
      }
      case 'middle': {
        const centerY = (pageHeight - elementHeight) / 2;
        updateTransform(undefined, Math.round(centerY));
        break;
      }
    }

    moveable?.updateRect();
  };
};

export const useUpdateElementOpacity = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const changeOpacity = (opacity: number, callback: Function) => {
    if (!activeMoveableObject) return false;
    activeMoveableObject.setOpacity(opacity);

    callback();
    return true;
  };
  return changeOpacity;
};

export const useUpdatePhotoPosition = () => {
  const { activePage } = useActivePage();
  const activePhotoObject = useActivePhotoObject();
  const changePhotoPosition = (
    position: PhotoPosition,
    originPosition: PhotoPosition,
    callback?: Function,
  ) => {
    if (!activePhotoObject || !activePage) return false;
    activePhotoObject.setPhotoPosition(position, originPosition, activePage);

    callback && callback();
    return true;
  };
  return changePhotoPosition;
};

export const useUpdateGradientMask = () => {
  const { activePage } = useActivePage();
  const activePhotoObject = useActivePhotoObject();
  const changeGradientMask = (
    gradientMask?: GradientMask,
    callback?: Function,
  ) => {
    if (!activePhotoObject) return false;
    activePhotoObject.updateGradientMask(gradientMask);

    callback && callback();
    return true;
  };
  return changeGradientMask;
};

export const useSetBackgroundImage = () => {
  const { activePage } = useActivePage();
  const activePhotoObject = useActivePhotoObject();
  const setBackgroundImage = (callback?: Function) => {
    if (!activePhotoObject || !activePage) return false;
    activePhotoObject.setAsBackground(activePage);

    callback && callback();
    return true;
  };
  return setBackgroundImage;
};

export const useUpdateTextStretchFont = () => {
  const activeText = useActiveTextObject();
  const updateTextStretchFont = (stretchFont: number, callback?: Function) => {
    if (!activeText) return false;
    activeText.setTextScale({ scaleX: stretchFont / 100 });
    activeText.render();
    callback && callback();
    return true;
  };
  return updateTextStretchFont;
};
