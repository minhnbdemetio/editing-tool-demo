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
