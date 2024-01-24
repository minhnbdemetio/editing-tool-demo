import { v4 } from 'uuid';
import { PHOTO_INNER_ELEMENTS, SOURCE_GRAPHIC } from '../../constant/photo';
import { MoveablePhoto } from '../MoveablePhoto';

export enum PhotoFilterType {
  None = 'None',
  Colorful = 'Colorful',
  Sunset = 'Sunset',
  Bright = 'Bright',
  EarlyMorning = 'Early Morning',
  Recall = 'Recall',
  Romantic = 'Romantic',
  Contrast = 'Contrast',
  Calm = 'Calm',
  Vintage = 'Vintage',
  Blue = 'Blue',
  Lovely = 'Lovely',
  Sepia = 'Sepia',
  Analog = 'Analog',
  Monster = 'Monster',
  BlackWhite = 'BlackWhite',
}

export abstract class PhotoFilter {
  name: PhotoFilterType;

  public getName(): PhotoFilterType {
    return this.name;
  }

  public setName(name: PhotoFilterType): void {
    this.name = name;
  }

  contrast: number;
  public getContrast() {
    return this.contrast;
  }
  public setContrast(contrast: number) {
    this.contrast = contrast;
  }
  filterId: string;
  public getFilterId() {
    return this.filterId;
  }
  public setFilterId(filterId: string) {
    this.filterId = filterId;
  }
  brightness: number;
  public getBrightness() {
    return this.brightness;
  }
  public setBrightness(brightness: number) {
    this.brightness = brightness;
  }
  saturation: number;
  public getSaturation() {
    return this.saturation;
  }
  public setSaturation(saturation: number) {
    this.saturation = saturation;
  }
  blur: number;
  public getBlur() {
    return this.blur;
  }
  public setBlur(blur: number) {
    this.blur = blur;
  }
  temperature: number;
  public getTemperature() {
    return this.temperature;
  }
  public setTemperature(temperature: number) {
    this.temperature = temperature;
  }
  hue:
    | {
        r: number;
        g: number;
        b: number;
      }
    | undefined;
  public getHue() {
    return this.hue;
  }
  public setHue(
    hue?:
      | {
          r: number;
          g: number;
          b: number;
        }
      | undefined,
  ) {
    this.hue = hue;
  }
  vignette: number;
  public getVignette() {
    return this.vignette;
  }
  public setVignette(vignette: number) {
    this.vignette = vignette;
  }
  thumbnail: string;
  public getThumbnail() {
    return this.thumbnail;
  }
  public setThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
  }
  constructor() {
    this.filterId = v4();
    this.name = PhotoFilterType.None;
    this.contrast = 0;
    this.brightness = 0;
    this.saturation = 0;
    this.blur = 0;
    this.temperature = 0;
    this.hue = undefined;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/none.png';
  }

  createFilter() {}

  public getContrastFilter(source: string = SOURCE_GRAPHIC): {
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

    <feBlend  result="${PHOTO_INNER_ELEMENTS.CONTRAST_MASK}" in="contrast" in2="${source}" mode="normal"></feBlend>
    `,
      id: PHOTO_INNER_ELEMENTS.CONTRAST_MASK,
    };
  }

  public getBrightnessFilter(source: string = SOURCE_GRAPHIC): {
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

    <feBlend  result="${PHOTO_INNER_ELEMENTS.BRIGHTNESS_MASK}" in="brightness" in2="${source}" mode="normal"></feBlend>
    `,
      id: PHOTO_INNER_ELEMENTS.BRIGHTNESS_MASK,
    };
  }

  public getTemperatureFilter(source: string = SOURCE_GRAPHIC): {
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

     <feBlend  result="${PHOTO_INNER_ELEMENTS.TEMPERATURE_MASK}" in="temperature-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: PHOTO_INNER_ELEMENTS.TEMPERATURE_MASK,
    };
  }

  public getSaturationFilter(source: string = SOURCE_GRAPHIC): {
    id: string;
    html: string | null;
  } {
    if (this.saturation === 0) return { id: source, html: null };

    const saturation = 1 + (this.saturation / 100) * 1;
    return {
      html: `
     <feColorMatrix id="saturation-filter" type="saturate" values="${saturation}"/>
     <feBlend  result="${PHOTO_INNER_ELEMENTS.SATURATION_MASK}" in="saturation-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: PHOTO_INNER_ELEMENTS.SATURATION_MASK,
    };
  }

  public getBlurFilter(source: string = SOURCE_GRAPHIC): {
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
          <feComposite operator="arithmetic" result="${PHOTO_INNER_ELEMENTS.BLUR_FILTER}" k1="0" k2="${k2}" k3="${k3}" k4="0" in="${source}" in2="t2"></feComposite>
          `,
        id: PHOTO_INNER_ELEMENTS.BLUR_FILTER,
      };
    }

    const blur = (this.blur / 100) * 5;
    return {
      html: `
     <feGaussianBlur result="${PHOTO_INNER_ELEMENTS.BLUR_FILTER}" in="${source}" stdDeviation="${blur}" />
    `,
      id: PHOTO_INNER_ELEMENTS.BLUR_FILTER,
    };
  }

  public getVignetteFilter(
    source: string = SOURCE_GRAPHIC,
    elementWidth: number,
    elementHeight: number,
  ): {
    id: string;
    html: string | null;
  } {
    if (this.vignette === 0)
      return {
        id: source,
        html: null,
      };

    const centerX = elementWidth / 2;
    const centerY = elementHeight / 2;

    const z = 3 * elementWidth * (1 - this.vignette / 100);

    return {
      html: `
      <feFlood id="vignette-flood" x="0" y="0" result="blackfield" flood-color="#000000" flood-opacity="1"></feFlood>
      
      <feSpecularLighting id="vignette-specular" result="spotlight" lighting-color="#FFFFFF" surfaceScale="1" specularConstant="1" specularExponent="120">
        <fePointLight id="vignette-pointlight" x="${centerX}" y="${centerY}" z="${z}"></fePointLight>
      </feSpecularLighting>
      
      <feBlend id="vignette-mask" result="mask" in="blackfield" in2="spotlight" mode="lighten"></feBlend>
      
      <feBlend id="vignette-mask-multiply" in="mask" in2="${source}" mode="multiply" result="${PHOTO_INNER_ELEMENTS.VIGNETTE_RESULT}">
    `,
      id: PHOTO_INNER_ELEMENTS.VIGNETTE_RESULT,
    };
  }

  public getHueFilter(source: string = SOURCE_GRAPHIC): {
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

     <feBlend  result="${PHOTO_INNER_ELEMENTS.HUE_MASK}" in="hue-filter" in2="${source}" mode="normal"></feBlend>
    `,
      id: PHOTO_INNER_ELEMENTS.HUE_MASK,
    };
  }

  public render(photo: MoveablePhoto) {
    photo.removeAllDefs();
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
    const { html: vignetteFilter } = this.getVignetteFilter(
      hueMaskId,
      photo.getWidth(),
      photo.getHeight(),
    );
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
    const gElement = document.getElementById(
      `${PHOTO_INNER_ELEMENTS.G}-${photo.id}`,
    );
    const filterElement = photo.getFilterContainer();
    if (filterElement && gElement) {
      if (appliedFilters.length) {
        gElement.setAttribute('filter', `url(#${this.filterId})`);
        filterElement.innerHTML = appliedFilters.join(' ');
      } else {
        filterElement.innerHTML = '';
        gElement.setAttribute('filter', ``);
      }
    }
  }
}
