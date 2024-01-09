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
