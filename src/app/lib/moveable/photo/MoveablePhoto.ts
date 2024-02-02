import axios from 'axios';
import { MoveableObject } from '../MoveableObject';
import { EditablePhoto } from '../editable/EditablePhoto';
import { PHOTO_INNER_ELEMENTS } from '../constant/photo';
import { PhotoFilter } from './filters/PhotoFilter';
import { NoneFilter } from './filters/NoneFilter';
import { PhotoPosition } from './Croppable';
import { GradientMask } from './gradient-mask/GradientMask';

export class MoveablePhoto extends MoveableObject implements EditablePhoto {
  loaded: boolean = false;
  filter: PhotoFilter = new NoneFilter();
  dragStartPoint?: { x: number; y: number };
  gradientMask?: GradientMask;
  cropPosition?: PhotoPosition | undefined;
  isBackground: boolean = false;
  backgroundStartPosition?: PhotoPosition;
  src: string;
  fillOpacity? = 1;
  fillColor?: string | undefined = 'transparent';
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
              console.log(image.width, image.height);
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
    const id = `${PHOTO_INNER_ELEMENTS.DEFS}-${this.id}`;

    return document.getElementById(id)?.querySelector('filter');
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

  public renderFilter() {
    this.filter.render(this);
  }

  public changeContrast(contrast: number) {
    this.filter.setContrast(contrast);

    this.renderFilter();
  }

  public changeBrightness(brightness: number) {
    this.filter.setBrightness(brightness);

    this.renderFilter();
  }
  public changeSaturation(saturation: number) {
    this.filter.setSaturation(saturation);

    this.renderFilter();
  }
  public changeHue(hue: { r: number; g: number; b: number }) {
    this.filter.setHue(hue);

    this.renderFilter();
  }
  public changeTemperature(temp: number) {
    this.filter.setTemperature(temp);

    this.renderFilter();
  }
  public changeBlur(blur: number) {
    this.filter.setBlur(blur);

    this.renderFilter();
  }
  public changeVignette(vignette: number) {
    this.filter.setVignette(vignette);

    this.renderFilter();
  }

  public setFilter(filter: PhotoFilter) {
    this.filter.setHue(filter.hue);
    this.filter.setBrightness(filter.brightness);
    this.filter.setBlur(filter.blur);
    this.filter.setVignette(filter.vignette);
    this.filter.setContrast(filter.contrast);
    this.filter.setSaturation(filter.saturation);
    this.filter.setTemperature(filter.temperature);

    this.renderFilter();
  }
  public getFilterParam() {
    return this.filter.getParams();
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
      `${PHOTO_INNER_ELEMENTS.IMAGE_LAYER}-${this.id}`,
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

  updateGradientMask(gradientMask?: GradientMask) {
    const defsContainer = this.getDefsContainer();
    const svg = document.getElementById(`svg-container-${this.id}`);

    if (!defsContainer || !svg) return;
    if (!gradientMask || this.gradientMask?.type !== gradientMask?.type) {
      this.removeAllGradientMask();
    }
    const imageElement = document.getElementById(`g-${this.id}`);
    if (!gradientMask || !imageElement) return;
    this.gradientMask?.createMask(this.id, defsContainer);
    this.gradientMask = gradientMask;
  }

  setAsBackground(activePageId: string) {
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
    const ratio = this.width / this.height;
    const { x, y, width, height } = element.getBoundingClientRect();
    const {
      x: pageX,
      y: pageY,
      height: pageHeight,
    } = activePageElement.getBoundingClientRect();

    element.style.width = `100%`;
    element.style.height = `${pageHeight / scale}px`;
    // element.style.transform = `translate(0px, 0px)`;
    activePageElement.style.overflow = 'hidden';

    this.backgroundStartPosition = {
      x: x - pageX,
      y: y - pageY,
      width,
      height,
    };
  }

  fill() {
    const activeElement = this.getElement();
    if (!activeElement) return;
    const fillColorElement = this.getFillElement();
    if (fillColorElement) {
      fillColorElement.style.backgroundColor = this.fillColor || 'transparent';
      fillColorElement.style.opacity = this.fillOpacity?.toString() || '1';
    } else {
      const newFillColorElement = document.createElement('div');
      newFillColorElement.id = `${PHOTO_INNER_ELEMENTS.FILL_COLOR}-${this.id}`;
      newFillColorElement.style.content = '';
      newFillColorElement.style.position = 'absolute';
      newFillColorElement.style.top = '0';
      newFillColorElement.style.left = '0';
      newFillColorElement.style.width = this.width + 'px';
      newFillColorElement.style.height = this.height + 'px';
      newFillColorElement.style.backgroundColor =
        this.fillColor || 'transparent';
      newFillColorElement.style.opacity = this.fillOpacity?.toString() || '1';
      newFillColorElement.style.zIndex = '1';
      activeElement.appendChild(newFillColorElement);
      return true;
    }
  }
  hideFillColor() {
    const fillElement = this.getFillElement();
    if (!fillElement) return;
    fillElement.style.display = 'none';
  }
  showFillColor() {
    const fillElement = this.getFillElement();
    if (!fillElement) return;
    fillElement.style.display = 'block';
  }
  getFillElement() {
    return document.getElementById(
      `${PHOTO_INNER_ELEMENTS.FILL_COLOR}-${this.id}`,
    );
  }
  setFillColor(color?: string) {
    this.fillColor = color;
    this.fill();
  }
  setFillOpacity(opacity?: number) {
    this.fillOpacity = opacity;
    this.fill();
  }
  hasFillColor() {
    return this.getFillElement()?.style.display === 'block';
  }
}
