import { GradientMask } from './GradientMask';

export class LinearGradientMask extends GradientMask {
  createMask(objectId: string, defsContainer: HTMLElement) {
    const svg = document.getElementById(`svg-container-${objectId}`);
    const imageElement = document.getElementById(`g-${objectId}`);
    if (!imageElement || !svg) return;
    if (!document.getElementById(`linear-gradient-def-${objectId}`)) {
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
      this.updateOffsetGradientElement(objectId, this.range ?? 50, 1);
      this.updateDirectionGradientElement(objectId, this.direction ?? 90);
    }
  }
  constructor(options?: { range?: number; direction?: number }) {
    super(options);
    this.type = 'linear';
  }
  getMask(objectId: string) {
    const elements = [];
    const range = this.range || 50;
    const direction = this.direction || 90;
    const { x1, y1, x2, y2 } = this.calculateDirectionGradient(direction);
    const linearGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient',
    );
    linearGradient.setAttribute('class', `gradient-def-${objectId}`);
    linearGradient.setAttribute('id', `linear-gradient-def-${objectId}`);
    linearGradient.setAttribute('x1', `${x1}`);
    linearGradient.setAttribute('y1', `${y1}`);
    linearGradient.setAttribute('x2', `${x2}`);
    linearGradient.setAttribute('y2', `${y2}`);
    linearGradient.innerHTML = ` <stop offset="0" stop-color="white" stop-opacity="0"></stop>
    <stop offset="${range / 100}" stop-color="white" stop-opacity="1"></stop>
    <stop offset="1" stop-color="white" stop-opacity="1"></stop>`;
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('class', `mask-def-${objectId}`);
    mask.setAttribute('id', `mask-def-${objectId}`);
    mask.innerHTML = `<rect x="0" y="0" width="100%" height="100%" fill="url(#${`linear-gradient-def-${objectId}`})"></rect>`;
    elements.push(linearGradient);
    elements.push(mask);
    return elements;
  }
}
