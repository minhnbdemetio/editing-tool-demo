import { GradientMask } from './GradientMask';

export class CircleGradientMask extends GradientMask {
  createMask(objectId: string, defsContainer: HTMLElement) {
    const svg = document.getElementById(`svg-container-${objectId}`);
    const imageElement = document.getElementById(`g-${objectId}`);
    if (!imageElement || !svg) return;
    if (!document.getElementById(`radial-gradient-def-${objectId}`)) {
      const defElements = this.getMask(objectId);
      defElements.forEach(element => defsContainer.appendChild(element));
      const maskElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g',
      );
      maskElement.setAttribute('id', `mask-svg-${objectId}`);
      maskElement.setAttribute('class', `mask-svg-${objectId}`);
      maskElement.setAttribute('mask', `url(#mask-def-${objectId})`);
      maskElement.appendChild(imageElement);
      svg.appendChild(maskElement);
    } else {
      this.updateOffsetGradientElement(objectId, this.range ?? 50);
    }
  }
  constructor(options?: { range?: number; direction?: number }) {
    super(options);
    this.type = 'circle';
  }
  getMask(objectId: string) {
    const elements = [];
    const range = this.range || 50;
    const radialGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'radialGradient',
    );
    radialGradient.setAttribute('class', `gradient-def-${objectId}`);
    radialGradient.setAttribute('id', `radial-gradient-def-${objectId}`);
    radialGradient.innerHTML = ` <stop offset="0" stop-color="white" stop-opacity="1"></stop>
    <stop offset="${range / 200}" stop-color="white" stop-opacity="1"></stop>
    <stop offset="1" stop-color="white" stop-opacity="0"></stop>`;
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('class', `mask-def-${objectId}`);
    mask.setAttribute('id', `mask-def-${objectId}`);
    mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`radial-gradient-def-${objectId}`})"></rect>`;
    elements.push(radialGradient);
    elements.push(mask);
    return elements;
  }
}
