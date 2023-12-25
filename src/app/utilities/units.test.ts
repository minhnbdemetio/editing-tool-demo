import { convertFrameSize } from './units';
import { random } from 'lodash';

describe('Test convertFrameSize function', () => {
  test('should return a correctly converted centimeter from pixels!', () => {
    const randomPixels = random(1, 10000);

    const actual = convertFrameSize('px', 'cm', randomPixels);
    const centimeterToPixels = 37.7952755906;
    expect(actual).toBe(+(randomPixels / centimeterToPixels).toFixed(0));
  });

  test('should return a correctly converted inches from pixels!', () => {
    const randomPixels = random(1, 10000);

    const actual = convertFrameSize('px', 'in', randomPixels);

    const inchToPixels = 96;

    expect(actual).toBe(+(randomPixels / inchToPixels).toFixed(0));
  });

  test('should return a correctly converted millimeter from pixels!', () => {
    const randomPixels = random(1, 10000);

    const actual = convertFrameSize('px', 'ml', randomPixels);

    const unitRate = 3.77952755906;

    expect(actual).toBe(+(randomPixels / unitRate).toFixed(0));
  });

  test('should return the input value cause converted unit is not supported!', () => {
    const randomPixels = random(1, 10000);

    const actual = convertFrameSize('px', '2ml', randomPixels);

    expect(actual).toBe(randomPixels);
  });

  test('should return a correctly converted pixels from inches!', () => {
    const randomInches = random(1, 10000);

    const actual = convertFrameSize('in', 'px', randomInches);

    const unitRate = 1 / 96;

    expect(actual).toBe(Math.round(randomInches / unitRate));
  });

  test('should return a correctly converted pixels from centimeter!', () => {
    const randomInches = random(1, 10000);

    const actual = convertFrameSize('cm', 'px', randomInches);

    const unitRate = 1 / 37.7952755906;

    expect(actual).toBe(Math.round(randomInches / unitRate));
  });

  test('should return a correctly converted pixels from millimeter!', () => {
    const randomInches = random(1, 10000);

    const actual = convertFrameSize('ml', 'px', randomInches);

    const unitRate = 1 / 3.77952755906;

    expect(actual).toBe(Math.round(randomInches / unitRate));
  });

  test('should return the input value cause from unit is not supported!', () => {
    const randomPixels = random(1, 10000);

    const actual = convertFrameSize('2ml', 'px', randomPixels);

    expect(actual).toBe(randomPixels);
  });

  test('should return the input value cause from and to parameters is not valid!', () => {
    const randomNumber = random(1, 10000);

    const actual = convertFrameSize('cm', 'ml', randomNumber);

    const unitRate = 1;

    expect(actual).toBe(Math.round(randomNumber / unitRate));
  });

  test('should return an original value!', () => {
    const randomInches = random(1, 10000);

    const actual = convertFrameSize('ml', 'px', randomInches, null);

    const unitRate = 3.77952755906;

    expect(actual).toBe(randomInches * unitRate);
  });

  test('should return a decimal value!', () => {
    const randomInches = random(1, 10000);

    const actual = convertFrameSize('ml', 'px', randomInches, 2);

    const unitRate = 1 / 3.77952755906;

    expect(actual).toBe(+(randomInches / unitRate).toFixed(2));
  });
});
