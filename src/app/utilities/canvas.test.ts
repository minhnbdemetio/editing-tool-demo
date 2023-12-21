import { fabric } from 'fabric';
import {
  calculateToolbarPosition,
  getEventTarget,
  getToolBarHorizontalCenterPosition,
  getToolBarVerticalPosition,
} from './canvas';
import {
  DEFAULT_TOOLBAR_POSITION,
  TOOLBAR_VERTICAL_OFFSET,
} from '../constants/canvas-constants';
import { random as getRandomNumber } from 'lodash';
import { RefObject } from 'react';

describe('Test getToolBarHorizontalCenterPosition', () => {
  const left = getRandomNumber(0, 100);
  const top = getRandomNumber(0, 100);
  const width = getRandomNumber(0, 100);
  const height = getRandomNumber(0, 100);
  beforeAll(() => {
    fabric.Object.prototype.getBoundingRect = jest.fn(() => ({
      left,
      top,
      width,
      height,
    }));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Should return horizontal center position', () => {
    const randomObject = new fabric.Object();
    const randomToolbarEl = document.createElement('div');
    const randomToolbarWidthValue = getRandomNumber(0, 100);
    jest
      .spyOn(randomToolbarEl, 'clientWidth', 'get')
      .mockReturnValue(randomToolbarWidthValue);

    expect(
      getToolBarHorizontalCenterPosition(randomObject, randomToolbarEl),
    ).toEqual(left + width / 2 - randomToolbarWidthValue / 2);
  });
});

describe('Test getToolBarVerticalPosition', () => {
  let left: number;
  let top: number;
  let width: number;
  let height: number;
  beforeEach(() => {
    left = getRandomNumber(0, 100);
    top = getRandomNumber(0, 100);
    width = getRandomNumber(0, 100);
    height = getRandomNumber(0, 100);
    fabric.Object.prototype.getBoundingRect = jest.fn(() => ({
      left,
      top,
      width,
      height,
    }));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Should return top vertical position', () => {
    const randomObject = new fabric.Object();
    const randomToolbarEl = document.createElement('div');
    const randomToolbarHeightValue = getRandomNumber(0, 100);
    jest
      .spyOn(randomToolbarEl, 'clientHeight', 'get')
      .mockReturnValue(randomToolbarHeightValue);

    expect(
      getToolBarVerticalPosition(randomObject, randomToolbarEl, 'top'),
    ).toEqual(top - randomToolbarHeightValue - TOOLBAR_VERTICAL_OFFSET);
  });

  test('Should return bottom vertical position', () => {
    const randomObject = new fabric.Object();
    const randomToolbarEl = document.createElement('div');
    const randomToolbarHeightValue = getRandomNumber(0, 100);
    jest
      .spyOn(randomToolbarEl, 'clientHeight', 'get')
      .mockReturnValue(randomToolbarHeightValue);

    expect(
      getToolBarVerticalPosition(randomObject, randomToolbarEl, 'bottom'),
    ).toEqual(top + height + TOOLBAR_VERTICAL_OFFSET);
  });
});

describe('Test getEventTarget', () => {
  beforeEach(() => {});
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Should return event selected[0]', () => {
    const mockSelectedObject = {} as fabric.Object;
    const mockEvent: fabric.IEvent<MouseEvent> = {
      selected: [mockSelectedObject],
      e: {} as MouseEvent,
    };
    expect(getEventTarget(mockEvent)).toBe(mockSelectedObject);
  });

  test('Should return event target', () => {
    const mockTargetObject = {} as fabric.Object;
    const mockEvent: fabric.IEvent<MouseEvent> = {
      target: mockTargetObject,
      e: {} as MouseEvent,
    };
    expect(getEventTarget(mockEvent)).toBe(mockTargetObject);
  });
});

describe('Test calculateToolbarPosition', () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Should return default position if the first condition is true', () => {
    const defaultPosition = {
      toolbarLeft: DEFAULT_TOOLBAR_POSITION,
      toolbarTop: DEFAULT_TOOLBAR_POSITION,
      rotatorLeft: DEFAULT_TOOLBAR_POSITION,
      rotatorTop: DEFAULT_TOOLBAR_POSITION,
    };
    const toolbarRef: RefObject<HTMLDivElement | null> = { current: null };
    const rotatorRef: RefObject<HTMLDivElement | null> = { current: null };

    expect(
      calculateToolbarPosition(undefined, toolbarRef, rotatorRef),
    ).toStrictEqual(defaultPosition);
  });

  test('Should return default position if the second condition is true', () => {
    const defaultPosition = {
      toolbarLeft: DEFAULT_TOOLBAR_POSITION,
      toolbarTop: DEFAULT_TOOLBAR_POSITION,
      rotatorLeft: DEFAULT_TOOLBAR_POSITION,
      rotatorTop: DEFAULT_TOOLBAR_POSITION,
    };
    const toolbarRef: RefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };
    const rotatorRef: RefObject<HTMLDivElement | null> = { current: null };

    expect(
      calculateToolbarPosition(new fabric.Object(), toolbarRef, rotatorRef),
    ).toStrictEqual(defaultPosition);
  });

  test('Should return default position if the third condition is true', () => {
    const defaultPosition = {
      toolbarLeft: DEFAULT_TOOLBAR_POSITION,
      toolbarTop: DEFAULT_TOOLBAR_POSITION,
      rotatorLeft: DEFAULT_TOOLBAR_POSITION,
      rotatorTop: DEFAULT_TOOLBAR_POSITION,
    };
    const toolbarRef: RefObject<HTMLDivElement | null> = { current: null };
    const rotatorRef: RefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };

    expect(
      calculateToolbarPosition(new fabric.Object(), toolbarRef, rotatorRef),
    ).toStrictEqual(defaultPosition);
  });

  test('Should return calculated position', () => {
    const toolbarRef: RefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };
    const rotatorRef: RefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };

    expect(
      calculateToolbarPosition(new fabric.Object(), toolbarRef, rotatorRef),
    ).toBeDefined();
  });
});
