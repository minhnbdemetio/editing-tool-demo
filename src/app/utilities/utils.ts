export function findKeyword(keywords: string[], input: string): string[] {
  const inputLowerCase = input.toLowerCase();

  return keywords.filter(keyword =>
    keyword.toLowerCase().includes(inputLowerCase),
  );
}
export interface CSSObject {
  [key: string]: string;
}

export function cssStringToObject(cssString: string): CSSObject {
  const cssArray = cssString.split(';').filter(Boolean);
  const cssObject: CSSObject = {};
  cssArray.forEach(pair => {
    const [key, value] = pair.split(':').map(item => item.trim());
    const camelCaseKey = key.replace(/-([a-z])/g, (match, group) =>
      group.toUpperCase(),
    );
    cssObject[camelCaseKey] = value;
  });

  return cssObject;
}

export interface TranslateValues {
  translateX: number;
  translateY: number;
}

export const parseTranslateString = (
  translateString: string,
): TranslateValues => {
  const match = translateString.match(
    /translate\((-?\d+(\.\d+)?)px, (-?\d+(\.\d+)?)px\)/,
  );

  if (match) {
    const translateX: number = parseFloat(match[1]);
    const translateY: number = parseFloat(match[3]);

    return { translateX, translateY };
  } else {
    return { translateX: 0, translateY: 0 };
  }
};
interface TransformResult {
  translate?: string;
  rotate?: string;
  translateX: string;
  translateY: string;
}

export function parseTransformString(transformString: string): TransformResult {
  const translatePattern = /translate\((-?[\d.]+px),\s*(-?[\d.]+px)\)/;
  const rotatePattern = /rotate\((-?[\d.]+deg)\)/;

  const hasTranslate = translatePattern.test(transformString);
  const hasRotate = rotatePattern.test(transformString);

  const result: TransformResult = {
    translate: '',
    rotate: '0',
    translateX: '',
    translateY: '',
  };

  if (hasTranslate) {
    const translateMatches = translatePattern.exec(transformString);
    if (translateMatches) {
      result.translate =
        'translate(' + translateMatches[1] + ', ' + translateMatches[2] + ')';
      result.translateX = translateMatches[1];
      result.translateY = translateMatches[2];
    }
  }

  if (hasRotate) {
    const rotateMatches = rotatePattern.exec(transformString);
    if (rotateMatches) {
      result.rotate = rotateMatches[1];
    }
  }

  return result;
}

export function calculateActualHeight(element: HTMLElement): number | null {
  if (!element) {
    return null;
  }

  // Lấy chiều rộng và chiều cao ban đầu của phần tử
  const width: number = element.offsetWidth;
  const height: number = element.offsetHeight;

  // Lấy góc xoay của phần tử (chuyển đổi về radian)
  const rotate: number = element.style.transform
    ? parseFloat(element.style.transform.replace(/[^\d.-]/g, '')) *
      (Math.PI / 180)
    : 0;
  // Tính chiều cao thực tế
  const actualHeight: number =
    Math.abs(height * Math.cos(Math.abs(rotate))) +
    Math.abs(width * Math.sin(Math.abs(rotate)));

  return actualHeight;
}
