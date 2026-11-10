import { Context } from 'effect'
import type { GameObject } from '../../game/types';
import type { SpatialObject } from '../types';


interface Trait<O> {
  collides: (left: O, right: O) => boolean;
}

export class CollisionDetectionService extends Context.Service<CollisionDetectionService, Trait<GameObject>>()("CollisionDetection") {}


export class CollisionDetection {
  collides(left: SpatialObject, right: SpatialObject): boolean {
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
