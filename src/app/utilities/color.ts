import { GradientStop } from './color.type';
// @ts-ignore
import ColorThief from 'colorthief';
import domtoimage from 'dom-to-image';

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}

export function getRandomHexColors(numColors: number) {
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomHexColor());
  }

  return colors;
}

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

export function createLinearGradientString(stops: GradientStop[]): string {
  const gradientString = stops
    .map(stop => `${stop.color} ${stop.offset * 100}%`)
    .join(', ');

  return `linear-gradient(${gradientString})`;
}

const MAX_PALETTE_COLORS = 15;

export const getElementPalette = async (
  elementId: string | null,
): Promise<string[]> => {
  if (!elementId) return [];

  const element = document.getElementById(elementId);
  if (!element) return [];
  const elementImageSrc = await domtoimage.toPng(element);
  const colorThief = new ColorThief();
  let palette: number[][] = [];
  const imageElement = document.createElement('img');
  imageElement.src = elementImageSrc;
  if (imageElement?.complete) {
    palette = await colorThief.getPalette(imageElement, MAX_PALETTE_COLORS);
  } else {
    palette = await new Promise(res => {
      imageElement?.addEventListener('load', function () {
        res(colorThief.getPalette(imageElement, MAX_PALETTE_COLORS));
      });
    });
  }

  return Array.from(
    new Set(
      palette.map((color: number[]) => rgbToHex(color[0], color[1], color[2])),
    ),
  );
};

export const hexToRgba = (hex: string, transparency: number = 1) => {
  if (hex && hex.includes('rgba'))
    return hex.replace(
      /rgba\((\d+), (\d+), (\d+), (\d+(\.\d+)?)\)/,
      `rgba($1, $2, $3, ${transparency})`,
    );
  if (hex && hex.includes('rgb'))
    return hex.replace('rgb', 'rgba').replace(')', `, ${transparency})`);
  let r: string | number, g: string | number, b: string | number;
  if (hex.length === 4) {
    r = hex.slice(1, 2);
    g = hex.slice(2, 3);
    b = hex.slice(3, 4);
    r = parseInt(r + r, 16);
    g = parseInt(g + g, 16);
    b = parseInt(b + b, 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${transparency})`;
};
