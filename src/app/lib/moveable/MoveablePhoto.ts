import axios from 'axios';
import { MoveableObject } from './MoveableObject';
import {
  PhotoPosition,
  GradientMask,
  EditablePhoto,
} from './editable/EditablePhoto';
import { PHOTO_INNER_ELEMENTS } from './constant/photo';
import { PhotoFilter } from '../filters/PhotoFilter';
import { NoneFilter } from '../filters/NoneFilter';

export class MoveablePhoto extends MoveableObject implements EditablePhoto {
  loaded: boolean = false;
  filter: PhotoFilter = new NoneFilter();
  dragStartPoint?: { x: number; y: number };
  cropPosition?: PhotoPosition;
  gradientMask?: GradientMask;
  isBackground: boolean = false;
  backgroundStartPosition?: PhotoPosition;
  src: string;
  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    if (options) {
      return new MoveablePhoto(this.src, options.id, options.htmlString);
    }
    const clonedData = this.cloneData();

    return new MoveablePhoto(
      this.src,
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }

  constructor(src: string, id?: string, htmlString?: string) {
    super({ id, htmlString });
    this.type = 'photo';
    this.src = src;
  }

  async setupMoveable() {
    await super.setupMoveable();
    await this.loadImageDimensions();
  }

  public async loadImageDimensions() {
    if (this.src) {
      await new Promise(response => {
        axios.get(this.src, { responseType: 'blob' }).then(res => {
          const fileReader = new FileReader();

          fileReader.onload = ev => {
            const image = document.createElement('img');
            image.src = (ev.target?.result as string) || '';
            image.style.display = 'hidden';
            image.style.position = 'absolute';

            document.body.appendChild(image);

            process.nextTick(() => {
              this.setHeight(image.height);
              this.setWidth(image.width);
              this.loaded = true;
              image.remove();

              response(true);
            });
          };

          fileReader.readAsDataURL(res.data);
        });
      });
    }
  }

  public getFilterContainer() {
    return document.querySelector(
      `div[data-id='${this.id}'] > div > svg > defs > filter`,
    );
  }

  public getSvg() {
    return document.getElementById(`${PHOTO_INNER_ELEMENTS.SVG}-${this.id}`);
  }

  public getDefsContainer() {
    return document.getElementById(`${PHOTO_INNER_ELEMENTS.DEFS}-${this.id}`);
  }

  public removeAllDefs() {
    const filterElement = this.getFilterContainer();
    if (filterElement)
      filterElement.childNodes.forEach(child => child.remove());
  }

  public hasVignetteApplied() {
    return this.filter.getVignette() > 0;
  }

  
  getImagePosition(): PhotoPosition | undefined {
    const element = this.getElement();
    if (!element) return;
    const { x, y, width, height } = element.getBoundingClientRect();
    const xOrigin = parseFloat(element.getAttribute('data-origin-x') ?? '0');
    const yOrigin = parseFloat(element.getAttribute('data-origin-y') ?? '0');
    const widthOrigin = parseFloat(
      element.getAttribute('data-origin-width') ?? '0',
    );
    const heightOrigin = parseFloat(
      element.getAttribute('data-origin-height') ?? '0',
    );
    return {
      x: xOrigin || x,
      y: yOrigin || y,
      width: widthOrigin || width,
      height: heightOrigin || height,
    };
  }

  setPhotoObjectPosition(
    position: PhotoPosition,
    originPosition: PhotoPosition,
    activePageId: string,
  ) {
    const element = this.getElement();
    const imageLayerContainer = document.getElementById(
      `image-layer-${this.id}`,
    );
    const imagePosition = this.getImagePosition();
    const activePageElement = document.getElementById(activePageId);
    if (
      !element ||
      !imageLayerContainer ||
      !activePageElement ||
      !imagePosition
    )
      return;

    const style = window.getComputedStyle(activePageElement);
    const scale = parseFloat(
      /matrix\((\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?)\)/.exec(
        style.transform,
      )?.[1] ?? '1',
    );

    const { x: activePageX, y: activePageY } =
      activePageElement.getBoundingClientRect();
    const translateX = (position.x - activePageX) / scale;
    const translateY = (position.y - activePageY) / scale;
    const deltaX = (position.x - originPosition.x) / scale;
    const deltaY = (position.y - originPosition.y) / scale;
    element.setAttribute('data-origin-width', `${originPosition.width}`);
    element.setAttribute('data-origin-height', `${originPosition.height}`);
    element.setAttribute('data-origin-x', `${originPosition.x}`);
    element.setAttribute('data-origin-y', `${originPosition.y}`);
    element.style.width = `${position.width / scale}px`;
    element.style.height = `${position.height / scale}px`;
    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    imageLayerContainer.style.width = `${imagePosition.width / scale}px`;
    imageLayerContainer.style.height = `${imagePosition.height / scale}px`;
    imageLayerContainer.style.transform = `translate(${
      deltaX ? -deltaX : -translateX
    }px, ${deltaY ? -deltaY : -translateY}px)`;

    this.cropPosition = position;
  }

  updateCropPosition(xChanged: number, yChanged: number) {
    const element = this.getElement();
    if (!element || !this.cropPosition) return;
    const { x, y } = this.cropPosition;
    this.cropPosition = {
      ...this.cropPosition,
      x: x + xChanged,
      y: y + yChanged,
    };
    const xOrigin = parseFloat(element.getAttribute('data-origin-x') ?? '0');
    const yOrigin = parseFloat(element.getAttribute('data-origin-y') ?? '0');
    element.setAttribute('data-origin-x', `${xOrigin + xChanged}`);
    element.setAttribute('data-origin-y', `${yOrigin + yChanged}`);
  }

  removeAllGradientMask() {
    const defsContainer = this.getDefsContainer();
    const imageElement = document.getElementById(`g-${this.id}`);
    const svg = this.getSvg();
    const maskImage = document.querySelector(
      `#svg-container-${this.id} .mask-svg-${this.id}`,
    );
    if (!defsContainer || !imageElement || !svg || !maskImage) return;
    const cloneImageElement = imageElement.cloneNode(true);
    const gradientMasks = defsContainer.querySelectorAll(
      `.gradient-def-${this.id}`,
    );
    gradientMasks.forEach(mask => mask.remove());
    const masks = defsContainer.querySelectorAll(`.mask-def-${this.id}`);
    masks.forEach(mask => mask.remove());
    maskImage.remove();
    svg.appendChild(cloneImageElement);
  }

  getRectGradientMask() {
    const elements = [];
    const { range = 50 } = this.gradientMask || {};
    for (let i = 0; i < 4; i++) {
      const linearGradient = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'linearGradient',
      );
      linearGradient.setAttribute('class', `gradient-def-${this.id}`);
      linearGradient.setAttribute('id', `gradient-def-${i}-${this.id}`);
      linearGradient.setAttribute('x1', i === 2 ? '1' : '0');
      linearGradient.setAttribute('y1', i === 3 ? '1' : '0');
      linearGradient.setAttribute('x2', i === 1 ? '1' : '0');
      linearGradient.setAttribute('y2', i === 0 ? '1' : '0');
      linearGradient.innerHTML = ` <stop offset="0" stop-color="white" stop-opacity="0"></stop>
      <stop offset="${range / 200}" stop-color="white" stop-opacity="1"></stop>
      <stop offset="1" stop-color="white" stop-opacity="1"></stop>`;
      const mask = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'mask',
      );
      mask.setAttribute('class', `mask-def-${this.id}`);
      mask.setAttribute('id', `mask-def-${i}-${this.id}`);
      mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`gradient-def-${i}-${this.id}`})"></rect>`;
      elements.push(linearGradient);
      elements.push(mask);
    }
    return elements;
  }

  getCircleGradientMask() {
    const elements = [];
    const { range = 50 } = this.gradientMask || {};
    const radialGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'radialGradient',
    );
    radialGradient.setAttribute('class', `gradient-def-${this.id}`);
    radialGradient.setAttribute('id', `radial-gradient-def-${this.id}`);
    radialGradient.innerHTML = ` <stop offset="0" stop-color="white" stop-opacity="1"></stop>
    <stop offset="${range / 200}" stop-color="white" stop-opacity="1"></stop>
    <stop offset="1" stop-color="white" stop-opacity="0"></stop>`;
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('class', `mask-def-${this.id}`);
    mask.setAttribute('id', `mask-def-${this.id}`);
    mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`radial-gradient-def-${this.id}`})"></rect>`;
    elements.push(radialGradient);
    elements.push(mask);
    return elements;
  }

  getLinearGradientMask() {
    const elements = [];
    const { range = 50, direction = 90 } = this.gradientMask || {};
    const { x1, y1, x2, y2 } = this.calculateDirectionGradient(direction);
    const linearGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient',
    );
    linearGradient.setAttribute('class', `gradient-def-${this.id}`);
    linearGradient.setAttribute('id', `linear-gradient-def-${this.id}`);
    linearGradient.setAttribute('x1', `${x1}`);
    linearGradient.setAttribute('y1', `${y1}`);
    linearGradient.setAttribute('x2', `${x2}`);
    linearGradient.setAttribute('y2', `${y2}`);
    linearGradient.innerHTML = ` <stop offset="0" stop-color="white" stop-opacity="0"></stop>
    <stop offset="${range / 100}" stop-color="white" stop-opacity="1"></stop>
    <stop offset="1" stop-color="white" stop-opacity="1"></stop>`;
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('class', `mask-def-${this.id}`);
    mask.setAttribute('id', `mask-def-${this.id}`);
    mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`linear-gradient-def-${this.id}`})"></rect>`;
    elements.push(linearGradient);
    elements.push(mask);
    return elements;
  }

  updateOffsetGradientElement(range: number, radius: number = 2) {
    const linearGradients = document.querySelectorAll(
      `.gradient-def-${this.id}`,
    );
    linearGradients.forEach(el => {
      const offsetEl = el.children[1];
      if (!offsetEl) return;
      offsetEl.setAttribute('offset', `${range / (100 * radius)}`);
    });
  }

  calculateDirectionGradient(direction: number) {
    let alpha = direction;
    if (direction <= 45) {
      return {
        x1: Math.sin(alpha * (Math.PI / 180)) / 2,
        y1: -Math.cos(alpha * (Math.PI / 180)) / 2,
        x2: -Math.cos(alpha * (Math.PI / 180)) / 2,
        y2: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 90) {
      return {
        x1: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        y1: -Math.sin(alpha * (Math.PI / 180)) / 2,
        x2: -Math.sin(alpha * (Math.PI / 180)) / 2,
        y2: Math.cos(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 135) {
      return {
        x1: 1 + Math.sin(alpha * (Math.PI / 180)) / 2,
        y1: Math.cos(alpha * (Math.PI / 180)) / 2,
        x2: Math.cos(alpha * (Math.PI / 180)) / 2,
        y2: -Math.sin(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 180) {
      return {
        x1: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        y1: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
        x2: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
        y2: Math.cos(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 225) {
      return {
        x1: 1 + Math.sin(alpha * (Math.PI / 180)) / 2,
        y1: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        x2: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        y2: -Math.sin(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 270) {
      return {
        x1: Math.cos(alpha * (Math.PI / 180)) / 2,
        y1: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
        x2: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
        y2: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
      };
    } else if (direction <= 315) {
      return {
        x1: Math.sin(alpha * (Math.PI / 180)) / 2,
        y1: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        x2: 1 - Math.cos(alpha * (Math.PI / 180)) / 2,
        y2: 1 - Math.sin(alpha * (Math.PI / 180)) / 2,
      };
    } else {
      return {
        x1: -Math.cos(alpha * (Math.PI / 180)) / 2,
        y1: Math.sin(alpha * (Math.PI / 180)) / 2,
        x2: Math.sin(alpha * (Math.PI / 180)) / 2,
        y2: 1 + Math.cos(alpha * (Math.PI / 180)) / 2,
      };
    }
  }

  updateDirectionGradientElement(direction: number) {
    const linearGradients = document.querySelectorAll(
      `.gradient-def-${this.id}`,
    );
    const { x1, y1, x2, y2 } = this.calculateDirectionGradient(direction);
    linearGradients.forEach(el => {
      el.setAttribute('x1', `${x1}`);
      el.setAttribute('y1', `${y1}`);
      el.setAttribute('x2', `${x2}`);
      el.setAttribute('y2', `${y2}`);
    });
  }

  updateGradientMask(gradientMask?: GradientMask) {
    const defsContainer = this.getDefsContainer();
    const svg = document.getElementById(`svg-container-${this.id}`);

    if (!defsContainer || !svg) return;
    if (!gradientMask || this.gradientMask?.type !== gradientMask?.type) {
      this.removeAllGradientMask();
    }
    const imageElement = document.getElementById(`g-${this.id}`);
    if (!gradientMask || !imageElement) return;
    switch (gradientMask.type) {
      case 'rect':
        if (!document.getElementById(`mask-svg-3-${this.id}`)) {
          const defElements = this.getRectGradientMask();
          defElements.forEach(element => defsContainer.appendChild(element));
          const maskElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'g',
          );
          maskElement.setAttribute('id', `mask-svg-3-${this.id}`);
          maskElement.setAttribute('class', `mask-svg-${this.id}`);
          maskElement.setAttribute('mask', `url(#mask-def-3-${this.id})`);

          for (let i = 2; i >= 0; i--) {
            const maskImage = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'g',
            );
            maskImage.setAttribute('id', `mask-svg-${i}-${this.id}`);
            maskImage.setAttribute('mask', `url(#mask-def-${i}-${this.id})`);
            maskImage.style.maskImage = `url(#mask-def-${i}-${this.id})`;
            const lastChild = maskElement.querySelector(
              `#mask-svg-${i + 1}-${this.id}`,
            );
            if (!lastChild) {
              maskElement.appendChild(maskImage);
            } else {
              lastChild.appendChild(maskImage);
            }
          }
          const lastChild = maskElement.querySelector(`#mask-svg-0-${this.id}`);
          if (!lastChild) break;
          lastChild.appendChild(imageElement);
          svg.appendChild(maskElement);
        } else {
          this.updateOffsetGradientElement(gradientMask.range ?? 50);
        }
        break;
      case 'circle':
        if (!document.getElementById(`radial-gradient-def-${this.id}`)) {
          const defElements = this.getCircleGradientMask();
          defElements.forEach(element => defsContainer.appendChild(element));
          const maskElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'g',
          );
          maskElement.setAttribute('id', `mask-svg-${this.id}`);
          maskElement.setAttribute('class', `mask-svg-${this.id}`);
          maskElement.setAttribute('mask', `url(#mask-def-${this.id})`);
          maskElement.appendChild(imageElement);
          svg.appendChild(maskElement);
        } else {
          this.updateOffsetGradientElement(gradientMask.range ?? 50);
        }
        break;
      default:
        if (!document.getElementById(`linear-gradient-def-${this.id}`)) {
          const defElements = this.getLinearGradientMask();
          defElements.forEach(element => defsContainer.appendChild(element));
          const maskElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'g',
          );
          maskElement.setAttribute('id', `mask-svg-${this.id}`);
          maskElement.setAttribute('class', `mask-svg-${this.id}`);
          maskElement.setAttribute('mask', `url(#mask-def-${this.id})`);
          maskElement.appendChild(imageElement);
          svg.appendChild(maskElement);
        } else {
          this.updateOffsetGradientElement(gradientMask.range ?? 50, 1);
          this.updateDirectionGradientElement(gradientMask.direction ?? 90);
        }
        break;
    }
    this.gradientMask = gradientMask;
  }

  setBackground(activePageId: string) {
    this.isBackground = !this.isBackground;
    const activePageElement = document.getElementById(activePageId);
    const element = this.getElement();
    if (!activePageElement || !element) return;
    const activePageStyles = window.getComputedStyle(activePageElement);
    const scale = parseFloat(
      /matrix\((\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?)\)/.exec(
        activePageStyles.transform,
      )?.[1] ?? '1',
    );
    if (!this.isBackground && this.backgroundStartPosition) {
      const { x, y, width, height } = this.backgroundStartPosition;
      activePageElement.style.overflow = 'visible';
      element.style.width = `${width / scale}px`;
      element.style.height = `${height / scale}px`;
      element.style.transform = `translate(${x / scale}px, ${y / scale}px)`;
      this.backgroundStartPosition = undefined;
      return;
    }
    const radition = this.width / this.height;
    const { x, y, width, height } = element.getBoundingClientRect();
    const {
      x: pageX,
      y: pageY,
      height: pageHeight,
    } = activePageElement.getBoundingClientRect();

    element.style.width = `${(pageHeight * radition) / scale}px`;
    element.style.height = `${pageHeight / scale}px`;
    element.style.transform = `translate(0px, 0px)`;
    activePageElement.style.overflow = 'hidden';

    this.backgroundStartPosition = {
      x: x - pageX,
      y: y - pageY,
      width,
      height,
    };
  }
}
