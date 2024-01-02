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
