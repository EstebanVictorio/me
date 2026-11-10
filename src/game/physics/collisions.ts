import { Context } from 'effect'
import type { GameObject } from '../types';

export class CollisionDetection {
  collides(left: GameObject, right: GameObject): boolean {
    const leftCoords = left.spatialProperties.coordinates;
    const rightCoords = right.spatialProperties.coordinates;

    const collisionExists =
     !(
      leftCoords.right < rightCoords.left ||
      leftCoords.left > rightCoords.right ||
      leftCoords.bottom < rightCoords.top ||
      leftCoords.top > rightCoords.bottom
    );

    return collisionExists;
  }
}
