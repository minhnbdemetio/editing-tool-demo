import axios from 'axios';
import { MoveableObject } from './MoveableObject';
import { v4 as uuid } from 'uuid';

export class MoveablePhoto extends MoveableObject {
  private x: number = 0;
  private y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public loaded: boolean = false;

  public contrast: number = 0;
  public filterId: string = uuid();

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
      `div[data-id='${this.id}'] > svg > defs > filter`,
    );
  }

  public removeAllDefs() {
    const filterElement = this.getFilterContainer();
    if (filterElement)
      filterElement.childNodes.forEach(child => child.remove());
  }

  public getContrastFilter(): string | null {
    if (this.contrast === 0) return null;
    let contrastRate = this.contrast > 0 ? 0.5 : 0.4;

    const slope = 1 + (this.contrast / 100) * contrastRate;
    const intercept = (-this.contrast / 100) * contrastRate;
    return `
    <feComponentTransfer>
        <feFuncR type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncG type="linear" slope="${slope}" intercept="${intercept}"/>
    
        <feFuncB type="linear" slope="${slope}" intercept="${intercept}"/>
    </feComponentTransfer>
    `;
  }

  public renderFilter() {
    this.removeAllDefs();

    const filters: (string | null)[] = [this.getContrastFilter()];
    const appliedFilters: string[] = filters.filter(f => !!f) as string[];

    const imageElement = document.querySelector(
      `div[data-id='${this.id}'] > svg > g`,
    );

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
}
