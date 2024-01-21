import axios from 'axios';
import { MoveableObject } from './MoveableObject';
import { v4 as uuid } from 'uuid';
import { PhotoFilter } from '../../types';

export type PhotoPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GradientMaskType = 'rect' | 'circle' | 'linear';

export type GradientMask = {
  direction?: number;
  range?: number;
  type?: GradientMaskType;
};

export class MoveablePhoto extends MoveableObject {
  private x: number = 0;
  private y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public loaded: boolean = false;

  public contrast: number = 0;
  public filterId: string = uuid();
  public brightness: number = 0;
  public saturation: number = 0;
  public blur: number = 0;
  public temperature: number = 0;
  public hue:
    | {
        r: number;
        g: number;
        b: number;
      }
    | undefined = undefined;

  public vignette: number = 0;

  dragStartPoint?: { x: number; y: number };
  cropPosition?: PhotoPosition;
  gradientMask?: GradientMask;
  clone(
    options?: { htmlString: string; id: string } | undefined,
  ): MoveableObject {
    if (options) {
      return new MoveablePhoto(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveablePhoto(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
  src: string;
  constructor(src: string, id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'photo';
    this.src = src;
  }

  public setHeight(height: number) {
    this.height = height;
  }
  public setWidth(width: number) {
    this.width = width;
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
    return document.getElementById(`svg-container-${this.id}`);
  }

  public getDefsContainer() {
    return document.getElementById(`defs-${this.id}`);
  }

  public removeAllDefs() {
    const filterElement = this.getFilterContainer();
    if (filterElement)
      filterElement.childNodes.forEach(child => child.remove());
  }

  public hasVignetteApplied() {
    return this.vignette > 0;
  }

  public getContrastFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.contrast === 0)
      return {
        id: source,
        html: null,
      };

    const contrastPercent = this.contrast / 100;

    let slope = 0;
    let intercept = 0;
    const BASE_SLOPE = 1;

    if (this.contrast < 0) {
      const MAX_SLOPE = 0.6;
      const MAX_INTERCEPT = 0.3;

      slope = BASE_SLOPE + contrastPercent * MAX_SLOPE;
      intercept = -contrastPercent * MAX_INTERCEPT;
    } else {
      const MAX_SLOPE = 1.4949999999999997;
      const MAX_INTERCEPT = -0.7447599999999999;

      slope = BASE_SLOPE + contrastPercent * MAX_SLOPE;
      intercept = contrastPercent * MAX_INTERCEPT;
    }

    return {
      html: `
    <feComponentTransfer id="contrast"  >
        <feFuncR type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncG type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncB type="linear" slope="${slope}" intercept="${intercept}"/>
    </feComponentTransfer>

    <feBlend  result="contrast-mask" in="contrast" in2="${source}" mode="normal"></feBlend>
    `,
      id: 'contrast-mask',
    };
  }

  public getBrightnessFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.brightness === 0)
      return {
        id: source,
        html: null,
      };
    const brightnessPercent = this.brightness / 100;

    let slope = 0;
    let intercept = 0;
    const BASE_SLOPE = 1;

    if (this.brightness > 0) {
      const MAX_SLOPE = 1.4822215967726804;
      const MAX_INTERCEPT = 0.09019607843137255;

      slope = BASE_SLOPE + brightnessPercent * MAX_SLOPE;
      intercept = -brightnessPercent * MAX_INTERCEPT;
    } else {
      const MAX_SLOPE = 1.4822215967726804;
      const MAX_INTERCEPT = -0.5725490196078431;

      slope = BASE_SLOPE + Math.abs(brightnessPercent) * MAX_SLOPE;
      intercept = Math.abs(brightnessPercent) * MAX_INTERCEPT;
    }

    return {
      html: `
    <feComponentTransfer id="brightness">

        <feFuncR type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncG type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncB type="linear" slope="${slope}" intercept="${intercept}"/>

        
    </feComponentTransfer>

    <feBlend  result="brightness-mask" in="brightness" in2="${source}" mode="normal"></feBlend>
    `,
      id: `brightness-mask`,
    };
  }

  public getTemperatureFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.temperature === 0) return { id: source, html: null };

    const temperaturePercent = this.temperature / 100;

    const MAX_INTERCEPT = 0.1;
    const changeIntercept = MAX_INTERCEPT * temperaturePercent;
    let redIntercept: number;
    let blueIntercept: number;
    let greenIntercept: number;

    if (this.temperature > 0) {
      redIntercept = changeIntercept;
      greenIntercept = changeIntercept;
      blueIntercept = -changeIntercept;
    } else {
      redIntercept = -changeIntercept;
      greenIntercept = changeIntercept;
      blueIntercept = changeIntercept;
    }

    return {
      html: `
   <feComponentTransfer id="hue-filter">
        <feFuncR type="linear" slope="1" intercept="${redIntercept}"/>
        <feFuncG type="linear" slope="1" intercept="${greenIntercept}"/>
        <feFuncB type="linear" slope="1" intercept="${blueIntercept}"/>
    </feComponentTransfer>

     <feBlend  result="temperature-mask" in="temperature-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: `temperature-mask`,
    };
  }

  public getSaturationFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.saturation === 0) return { id: source, html: null };

    const saturation = 1 + (this.saturation / 100) * 1;
    return {
      html: `
     <feColorMatrix id="saturation-filter" type="saturate" values="${saturation}"/>
     <feBlend  result="saturation-mask" in="saturation-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: 'saturation-mask',
    };
  }

  public getBlurFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.blur === 0)
      return {
        id: source,
        html: null,
      };

    if (this.blur < 0) {
      const k2 = 1 + -1.25 * (-this.blur / 100);
      const k3 = 1.25 * (-this.blur / 100);

      return {
        html: `
          <feConvolveMatrix kernelMatrix="0 -1 0 -1 4.5 -1 0 -1 0" result="t2"></feConvolveMatrix>
          <feComposite operator="arithmetic" result="blur-filter" k1="0" k2="${k2}" k3="${k3}" k4="0" in="${source}" in2="t2"></feComposite>
          `,
        id: 'blur-filter',
      };
    }

    const blur = (this.blur / 100) * 5;
    return {
      html: `
     <feGaussianBlur result="blur-filter" in="${source}" stdDeviation="${blur}" />
    `,
      id: 'blur-filter',
    };
  }

  public getVignetteFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (this.vignette === 0)
      return {
        id: source,
        html: null,
      };

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    const z = 3 * this.width * (1 - this.vignette / 100);

    return {
      html: `
      <feFlood id="vignette-flood" x="0" y="0" result="blackfield" flood-color="#000000" flood-opacity="1"></feFlood>
      
      <feSpecularLighting id="vignette-specular" result="spotlight" lighting-color="#FFFFFF" surfaceScale="1" specularConstant="1" specularExponent="120">
        <fePointLight id="vignette-pointlight" x="${centerX}" y="${centerY}" z="${z}"></fePointLight>
      </feSpecularLighting>
      
      <feBlend id="vignette-mask" result="mask" in="blackfield" in2="spotlight" mode="lighten"></feBlend>
      
      <feBlend id="vignette-mask-multiply" in="mask" in2="${source}" mode="multiply" result="vignette-result">
    `,
      id: 'vignette-result',
    };
  }

  public getHueFilter(source: string = 'SourceGraphic'): {
    id: string;
    html: string | null;
  } {
    if (!this.hue)
      return {
        id: source,
        html: null,
      };

    const MAX_INTERCEPT = 0.1;

    const redIntercept = MAX_INTERCEPT * (this.hue.r / 255);
    const blueIntercept = MAX_INTERCEPT * (this.hue.b / 255);
    const greenIntercept = MAX_INTERCEPT * (this.hue.g / 255);

    return {
      html: `
     <feComponentTransfer id="hue-filter">
        <feFuncR type="linear" slope="0.9" intercept="${redIntercept}"/>
        <feFuncG type="linear" slope="0.9" intercept="${greenIntercept}"/>
        <feFuncB type="linear" slope="0.9" intercept="${blueIntercept}"/>
    </feComponentTransfer>

     <feBlend  result="hue-mask" in="hue-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: 'hue-mask',
    };
  }

  public renderFilter() {
    this.removeAllDefs();

    const { id: contrastMaskId, html: contrastFilter } =
      this.getContrastFilter();
    const { id: brightnessMaskId, html: brightnessFilter } =
      this.getBrightnessFilter(contrastMaskId);
    const { id: temperatureMaskId, html: temperatureFilter } =
      this.getTemperatureFilter(brightnessMaskId);
    const { id: blurFilterId, html: blurFilter } =
      this.getBlurFilter(temperatureMaskId);
    const { id: saturationMaskId, html: saturationFilter } =
      this.getSaturationFilter(blurFilterId);
    const { id: hueMaskId, html: hueFilter } =
      this.getHueFilter(saturationMaskId);
    const { html: vignetteFilter } = this.getVignetteFilter(hueMaskId);

    const filters: (string | null)[] = [
      contrastFilter,
      brightnessFilter,
      temperatureFilter,
      blurFilter,
      saturationFilter,
      hueFilter,
      vignetteFilter,
    ];

    const appliedFilters: string[] = filters.filter(f => !!f) as string[];

    const imageElement = document.getElementById(`g-${this.id}`);

    const element = this.getFilterContainer();

    if (element && imageElement) {
      if (appliedFilters.length) {
        imageElement.setAttribute('filter', `url(#${this.filterId})`);
        element.innerHTML = appliedFilters.join(' ');
      } else {
        element.innerHTML = '';
        imageElement.setAttribute('filter', ``);
      }
    }
  }

  public changeContrast(contrast: number) {
    this.contrast = contrast;

    this.renderFilter();
  }

  public changeBrightness(brightness: number) {
    this.brightness = brightness;

    this.renderFilter();
  }
  public changeSaturation(saturation: number) {
    this.saturation = saturation;

    this.renderFilter();
  }
  public changeHue(hue: { r: number; g: number; b: number }) {
    console.debug({ hue });
    this.hue = hue;

    this.renderFilter();
  }
  public changeTemperature(temp: number) {
    this.temperature = temp;

    this.renderFilter();
  }
  public changeBlur(blur: number) {
    this.blur = blur;

    this.renderFilter();
  }
  public changeVignette(vignette: number) {
    this.vignette = vignette;

    this.renderFilter();
  }

  public setFilter(filter: PhotoFilter) {
    this.hue = filter.hue;
    this.brightness = filter.brightness;
    this.blur = filter.blur;
    this.vignette = filter.vignette;
    this.contrast = filter.contrast;
    this.saturation = filter.saturation;
    this.temperature = filter.temperature;

    this.renderFilter();
  }
  public getFilterParam(): PhotoFilter {
    return {
      hue: this.hue,
      brightness: this.brightness,
      blur: this.blur,
      vignette: this.vignette,
      contrast: this.contrast,
      saturation: this.saturation,
      temperature: this.temperature,
    };
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
    const { x1, y1, x2, y2 } = this.caculateDirectionGradient(direction);
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

  caculateDirectionGradient(direction: number) {
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
    const { x1, y1, x2, y2 } = this.caculateDirectionGradient(direction);
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
}
