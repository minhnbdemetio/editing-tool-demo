import { GradientMask } from './GradientMask';

export class RectGradientMask extends GradientMask {
  getMask(objectId: string): any[] {
    const elements = [];
    const range = this.range || 50;
    for (let i = 0; i < 4; i++) {
      const linearGradient = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'linearGradient',
      );
      linearGradient.setAttribute('class', `gradient-def-${objectId}`);
      linearGradient.setAttribute('id', `gradient-def-${i}-${objectId}`);
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
      mask.setAttribute('class', `mask-def-${objectId}`);
      mask.setAttribute('id', `mask-def-${i}-${objectId}`);
      mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`gradient-def-${i}-${objectId}`})"></rect>`;
      elements.push(linearGradient);
      elements.push(mask);
    }
    return elements;
  }
  constructor(options?: { range?: number; direction?: number }) {
    super(options);
    this.type = 'rect';
  }

  createMask(objectId: string, defsContainer: HTMLElement) {
    const svg = document.getElementById(`svg-container-${objectId}`);
    const imageElement = document.getElementById(`g-${objectId}`);
    if (!imageElement || !svg) return;
    if (!document.getElementById(`mask-svg-3-${objectId}`)) {
      const defElements = this.getMask(objectId);
      defElements.forEach(element => defsContainer.appendChild(element));
      const maskElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g',
      );
      maskElement.setAttribute('id', `mask-svg-3-${objectId}`);
      maskElement.setAttribute('class', `mask-svg-${objectId}`);
      maskElement.setAttribute('mask', `url(#mask-def-3-${objectId})`);

      for (let i = 2; i >= 0; i--) {
        const maskImage = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g',
        );
        maskImage.setAttribute('id', `mask-svg-${i}-${objectId}`);
        maskImage.setAttribute('mask', `url(#mask-def-${i}-${objectId})`);
        maskImage.style.maskImage = `url(#mask-def-${i}-${objectId})`;
        const lastChild = maskElement.querySelector(
          `#mask-svg-${i + 1}-${objectId}`,
        );
        if (!lastChild) {
          maskElement.appendChild(maskImage);
        } else {
          lastChild.appendChild(maskImage);
        }
      }
      const lastChild = maskElement.querySelector(`#mask-svg-0-${objectId}`);
      if (!lastChild) return;
      lastChild.appendChild(imageElement);
      svg.appendChild(maskElement);
    } else {
      this.updateOffsetGradientElement(objectId, this.range ?? 50);
    }
  }
}
