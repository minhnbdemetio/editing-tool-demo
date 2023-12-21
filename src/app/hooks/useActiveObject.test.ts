import { renderHook } from '@testing-library/react';
import {
  useCopyActiveObject,
  useDeleteActiveObject,
  useRotateActiveObject,
} from './useActiveObject';
import { random as getRandomNumber } from 'lodash';
import {
  INITIAL_ANGLE,
  ROTATE_ANGLE_OFFSET,
} from '../constants/canvas-constants';
import { usePageCanvas } from './usePageCanvas';
import { fabric } from 'fabric';

jest.mock('./usePageCanvas');

describe('useRotateActiveObject', () => {
  let currentObjectAngle: number;
  beforeEach(() => {
    currentObjectAngle = getRandomNumber(0, 360);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('handles clockwise rotation', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([
      {
        getActiveObject: jest.fn(() => ({
          rotate: jest.fn(),
          angle: currentObjectAngle,
        })),
        renderAll: jest.fn(),
      },
    ]);
    const { result } = renderHook(() => useRotateActiveObject('clockwise'));
    const handleRotate = result.current;

    const rotatedAngle = handleRotate();

    expect(rotatedAngle).toBe(currentObjectAngle + ROTATE_ANGLE_OFFSET);
  });

  test('handles counterclockwise rotation', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([
      {
        getActiveObject: jest.fn(() => ({
          rotate: jest.fn(),
          angle: currentObjectAngle,
        })),
        renderAll: jest.fn(),
      },
    ]);
    const { result } = renderHook(() =>
      useRotateActiveObject('counterclockwise'),
    );
    const handleRotate = result.current;

    const rotatedAngle = handleRotate();

    expect(rotatedAngle).toBe(currentObjectAngle - ROTATE_ANGLE_OFFSET);
  });

  test('handles no active object', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([null]);
    const { result } = renderHook(() => useRotateActiveObject('clockwise'));
    const handleRotate = result.current;

    const rotatedAngle = handleRotate();

    expect(rotatedAngle).toBe(0);
  });

  test('handles has active object but angle is undefined', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([
      {
        getActiveObject: jest.fn(() => ({
          rotate: jest.fn(),
          angle: undefined,
        })),
        renderAll: jest.fn(),
      },
    ]);
    const randomDirection = (['clockwise', 'counterclockwise'] as const)[
      getRandomNumber(0, 1)
    ];
    const { result } = renderHook(() => useRotateActiveObject(randomDirection));
    const handleRotate = result.current;

    const rotatedAngle = handleRotate();

    expect([
      INITIAL_ANGLE + ROTATE_ANGLE_OFFSET,
      INITIAL_ANGLE - ROTATE_ANGLE_OFFSET,
    ]).toContain(rotatedAngle);
  });
});

describe('useDeleteActiveObject', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('handles has active object', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([
      {
        getActiveObject: jest.fn().mockReturnValueOnce(new fabric.Object()),
        remove: jest.fn(),
      },
    ]);
    const { result } = renderHook(() => useDeleteActiveObject());
    const handleDelete = result.current;

    const deleteResult = handleDelete();

    expect(deleteResult).toBe(true);
  });

  test('handles no active object', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([null]);
    const { result } = renderHook(() => useDeleteActiveObject());
    const handleDelete = result.current;

    const deleteResult = handleDelete();

    expect(deleteResult).toBe(false);
  });
});

describe('useDeleteActiveObject', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('handles has active object', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([
      {
        getActiveObject: jest.fn().mockReturnValueOnce(new fabric.Object()),
        setActiveObject: jest.fn(),
        discardActiveObject: jest.fn(),
        add: jest.fn(),
      },
    ]);
    const { result } = renderHook(() => useCopyActiveObject());
    const handleCopy = result.current;

    const copyResult = handleCopy();

    expect(copyResult).toBe(true);
  });

  test('handles no active object', () => {
    (usePageCanvas as jest.Mock).mockReturnValueOnce([null]);
    const { result } = renderHook(() => useCopyActiveObject());
    const handleCopy = result.current;

    const copyResult = handleCopy();

    expect(copyResult).toBe(false);
  });
});