import { Pentagon } from './Pentagon';

export class FivePointStar extends Pentagon {
  getCoordinates(): { x: number; y: number }[] {
    const coordinates = super.getCoordinates();
    const starCoordinates: { x: number; y: number }[] = [];

    for (let i = 0; i < coordinates.length; i++) {
      const current = coordinates[i];
      let next = coordinates[i + 1];

      starCoordinates.push(current);

      if (!next) {
        next = coordinates[0];
      }

      if (next) {
        const centerX = (next.x - current.x) / 2;
        const centerY = (next.y - current.y) / 2;

        const deltaX = next.x - current.x;
        const deltaY = next.y - current.y;

        const side = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const starHeight = side / 5;

        console.debug(
          'center side',
          current.x + deltaX / 2,
          current.y + deltaY / 2,
        );

        if (i === 0) {
          const rotateAngle =
            (Math.asin(deltaY / 2 / (side / 2)) * 180) / Math.PI;

          const starDeltaX =
            Math.cos((rotateAngle * Math.PI) / 180) * starHeight;
          const starDeltaY =
            Math.sin((rotateAngle * Math.PI) / 180) * starHeight;

          const centerPoint = this.getCenterPoint();

          let starCoordinate = {
            x: current.x + deltaX / 2 - starDeltaX,
            y: current.y + deltaX / 2 - starDeltaY,
          };
          starCoordinate = {
            x: current.x + deltaX / 2 - Math.abs(starDeltaX),
            y: current.y + deltaY / 2 + Math.abs(starDeltaY),
          };

          console.debug({ starCoordinate });

          starCoordinates.push(starCoordinate);
        }
        if (i === 1) {
          const rotateAngle =
            (Math.acos(deltaY / 2 / (side / 2)) * 180) / Math.PI;

          const starDeltaX =
            Math.cos((rotateAngle * Math.PI) / 180) * starHeight;
          const starDeltaY =
            Math.sin((rotateAngle * Math.PI) / 180) * starHeight;

          const centerPoint = this.getCenterPoint();

          let starCoordinate = {
            x: current.x + deltaX / 2 - starDeltaX,
            y: current.y + deltaX / 2 - starDeltaY,
          };

          starCoordinate = {
            x: current.x + deltaX / 2 - Math.abs(starDeltaX),
            y: current.y + deltaY / 2 - Math.abs(starDeltaY),
          };

          console.debug({ starCoordinate });

          starCoordinates.push(starCoordinate);
        }

        // console.debug({ centerX, centerY });
      }
    }

    return starCoordinates;
  }
}
