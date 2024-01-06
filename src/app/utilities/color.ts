import { GradientStop } from './color.type';

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

  return `linear-gradient(${gradientString}) border-box border-box`;
}
