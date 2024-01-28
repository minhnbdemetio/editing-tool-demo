import { CSSProperties, useCallback, useState } from 'react';
import {
  MoveableTextObject,
  MoveableTextShapeEffect,
  MoveableTextStyleEffect,
  TransformDirection,
} from '../lib/moveable/text/MoveableText';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useActivePage } from '../store/active-page';
import { GradientStop } from '../utilities/color.type';
import { parseTransformString } from '../utilities/utils';
import { isLine, isPhoto, isShape, isText } from '../utilities/moveable';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { useDesign } from '../store/design-objects';
import { isNumber } from 'lodash';
import { GradientMask, PhotoPosition } from '../lib/moveable/MoveablePhoto';
import { TextStyleEffect } from '../lib/moveable/effects/text/StyleEffect';
import {
  TextEffect,
  TextEffectOptions,
} from '../lib/moveable/effects/text/TextEffect';
import { ShapeEffect } from '../lib/moveable/effects/text/ShapeEffect';

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

export const useActiveMoveableShapeObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  return isShape(activeMoveableObject) ? activeMoveableObject : null;
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
    activeText?.render();
  };
};

export const useUpdateTextColor = () => {
  const activeText = useActiveTextObject();

  return (color: string) => {
    activeText?.setTextColor(color);
    activeText?.render();
  };
};

export const useUpdateShapeColor = () => {
  const activeShape = useActiveMoveableShapeObject();

  return (color: string) => {
    activeShape?.setColor(color);
    activeShape?.render();
  };
};

export const useUpdateShapeBorderColor = () => {
  const activeShape = useActiveMoveableShapeObject();

  return (color: string, borderWidth: number) => {
    activeShape?.setBorder(color, borderWidth);
    // activeShape?.render();
  };
};

export const useUpdateTextGradientColor = () => {
  const activeText = useActiveTextObject();

  return (gradientStops: GradientStop[]) => {
    activeText?.setTextGradient(gradientStops);
    activeText?.render();
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

export const useToggleMoveableBoldText = (
  activeText: MoveableTextObject | null,
) => {
  return (callback?: Function) => {
    const fontWeight = activeText?.getFontWeight();
    const isBold = fontWeight === 'bold' || fontWeight === '700';
    if (isBold) {
      activeText?.setFontWeight('400');
    } else {
      activeText?.setFontWeight('bold');
    }
    activeText?.render();
    callback && callback();
    return true;
  };
};

export const useToggleItalicText = (activeText: MoveableTextObject | null) => {
  const [isItalic, setIsItalic] = useState<boolean>(
    activeText?.isFontStyle('italic') || false,
  );

  return (callback?: Function) => {
    activeText?.setFontStyle(isItalic ? 'normal' : 'italic');
    activeText?.render();
    setIsItalic(!isItalic);

    callback && callback();
    return true;
  };
};

export const useToggleUnderlineText = (
  activeText: MoveableTextObject | null,
) => {
  const toggleUnderlineText = (callback?: Function) => {
    activeText?.setTextDecoration(
      'underline',
      !activeText.isTextDecorationEnable('underline'),
    );
    activeText?.render();

    callback && callback();
    return true;
  };

  return toggleUnderlineText;
};

export const useToggleLineThroughText = (
  activeText: MoveableTextObject | null,
) => {
  const toggleLineThroughText = (callback?: Function) => {
    activeText?.setTextDecoration(
      'lineThrough',
      !activeText.isTextDecorationEnable('lineThrough'),
    );
    activeText?.render();

    callback && callback();
    return true;
  };

  return toggleLineThroughText;
};

export const useToggleUppercaseText = (
  activeText: MoveableTextObject | null,
) => {
  const toggleUppercaseText = (callback?: Function) => {
    const isUppercase = activeText?.isTextTransform('uppercase');

    if (isUppercase) {
      activeText?.setTextTransform('none');
    } else {
      activeText?.setTextTransform('uppercase');
    }
    activeText?.render();
    callback && callback();
    return true;
  };

  return toggleUppercaseText;
};

export const useChangeTextAlign = (activeText: MoveableTextObject | null) => {
  const changeTextAlign = (textAlign: string, callback?: Function) => {
    activeText?.setTextAlign(textAlign);
    activeText?.render();
    return true;
  };

  return changeTextAlign;
};

export const useToggleListTypeDiscText = (
  activeText: MoveableTextObject | null,
) => {
  const toggleListTypeDiscText = (callback?: Function) => {
    activeText?.setTextListStyle(
      activeText?.isTextListStyle('disc') ? 'none' : 'disc',
    );

    activeText?.render();
    callback && callback();
    return true;
  };

  return toggleListTypeDiscText;
};

export const useToggleListTypeNumberText = (
  activeText: MoveableTextObject | null,
) => {
  const toggleListTypeText = (callback?: Function) => {
    activeText?.setTextListStyle(
      activeText?.isTextListStyle('number') ? 'none' : 'number',
    );
    activeText?.render();

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

export const useUpdateActiveTextShapeEffect = () => {
  const activeText = useActiveTextObject();
  const handleChangeTextEffect = (effect: ShapeEffect, cb: Function) => {
    const element = activeText?.getElement();
    if (!activeText || !element) return false;
    if (!element) return false;
    activeText.shapeEffect.reset(element);
    activeText.setShapeEffect(effect);
    activeText.render();

    cb();
    return true;
  };
  return handleChangeTextEffect;
};

export const useUpdateTextShapeEffectOptions = () => {
  const activeText = useActiveTextObject();
  const updateTextStyleEffectOptions = (
    shapeEffectOption: TextEffectOptions,
    callback?: Function,
  ) => {
    if (!activeText) return false;
    activeText.updateShapeEffectOption(shapeEffectOption);
    activeText.render();
    callback && callback();
    return true;
  };
  return updateTextStyleEffectOptions;
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
    activePhotoObject.setPhotoObjectPosition(
      position,
      originPosition,
      activePage,
    );

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
    activePhotoObject.setBackground(activePage);

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

export const useUpdateTextStyleEffect = () => {
  const activeText = useActiveTextObject();
  const updateTextStyleEffect = (
    styleEffect: TextEffect,
    callback?: Function,
  ) => {
    const element = activeText?.getElement();
    if (!activeText || !element) return false;
    activeText.styleEffect.reset(element);
    activeText.setStyleEffect(styleEffect);
    activeText.render();
    callback && callback();
    return true;
  };
  return updateTextStyleEffect;
};

export const useUpdateTextStyleEffectOptions = () => {
  const activeText = useActiveTextObject();
  const updateTextStyleEffectOptions = (
    styleEffectOption: TextEffectOptions,
    callback?: Function,
  ) => {
    if (!activeText) return false;
    activeText.updateStyleEffectOption(styleEffectOption);
    activeText.render();
    callback && callback();
    return true;
  };
  return updateTextStyleEffectOptions;
};
