import { Adornment } from './Adornment';

export class CircleAdornment extends Adornment {
  getAdornments(): { up: string; left: string; down: string; right: string } {
    const arrowLength = this.getLength();

    const x = this.getX();
    const y = this.getY();

    return {
      up: `<circle cx="${x}" cy="${
        y + arrowLength
      }" r="${arrowLength}" stroke="black" stroke-width="${
        this.strokeWidth
      }" fill="${this.outline ? 'none' : 'currentColor'}" />`,
      down: `<circle cx="${x}" cy="${
        y - arrowLength
      }" r="${arrowLength}" stroke="black" stroke-width="${
        this.strokeWidth
      }" fill="${this.outline ? 'none' : 'currentColor'}" />`,
      left: `<circle cx="${
        x + arrowLength
      }" cy="${y}" r="${arrowLength}" stroke="black" stroke-width="${
        this.strokeWidth
      }" fill="${this.outline ? 'none' : 'currentColor'}" />`,
      right: `<circle cx="${
        x - arrowLength
      }" cy="${y}" r="${arrowLength}" stroke="black" stroke-width="${
        this.strokeWidth
      }" fill="${this.outline ? 'none' : 'currentColor'}" />`,
    };
  }

  addPath(
    d: string,
    options?: {
      fill?: string | undefined;
      strokeDashArray?: [number, number] | undefined;
    },
  ): string {
    const adornments = this.getAdornments();

    return adornments[this.direction];
  }

  getPadding(): number {
    return this.getLength() * 2;
  }
}
