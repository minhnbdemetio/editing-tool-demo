export type GradientMaskType = 'rect' | 'circle' | 'linear';

export abstract class GradientMask {
  direction?: number;
  range?: number;
  type?: GradientMaskType;
  constructor(options?: { range?: number; direction?: number }) {
    this.direction = options?.direction;
    this.range = options?.range;
  }
  setRange(range?: number) {
    this.range = range;
  }
  setType(type?: GradientMaskType) {
    this.type = type;
  }
  setDirection(direction?: number) {
    this.direction = direction;
  }
  getRange() {
    return this.range;
  }
  getType() {
    return this.type;
  }
  getDirection() {
    return this.direction;
  }

  apply() {}
  abstract getMask(objectId: string): Array<any>;
  abstract createMask(objectId: string, defsContainer: HTMLElement): any;

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

  updateDirectionGradientElement(objectId: string, direction: number) {
    const linearGradients = document.querySelectorAll(
      `.gradient-def-${objectId}`,
    );
    const { x1, y1, x2, y2 } = this.calculateDirectionGradient(direction);
    linearGradients.forEach(el => {
      el.setAttribute('x1', `${x1}`);
      el.setAttribute('y1', `${y1}`);
      el.setAttribute('x2', `${x2}`);
      el.setAttribute('y2', `${y2}`);
    });
  }

  updateOffsetGradientElement(
    objectId: string,
    range: number,
    radius: number = 2,
  ) {
    const linearGradients = document.querySelectorAll(
      `.gradient-def-${objectId}`,
    );
    linearGradients.forEach(el => {
      const offsetEl = el.children[1];
      if (!offsetEl) return;
      offsetEl.setAttribute('offset', `${range / (100 * radius)}`);
    });
  }
}
