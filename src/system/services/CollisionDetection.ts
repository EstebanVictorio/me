import { Context } from 'effect'
import type { GameObject } from '../../game/types';
import type { SpatialObject } from '../types';


interface Trait<O> {
  calcCollissions: (left: O, right: O) => { collissions: { left: boolean, right: boolean, top: boolean, bottom: boolean } };
}

export class CollisionDetectionService extends Context.Service<CollisionDetectionService, Trait<GameObject>>()("CollisionDetection") {}


export class CollisionDetection {
  calcCollissions(left: SpatialObject, right: SpatialObject) {
    const leftCoords = left.spatialProperties.coordinates;
    const rightCoords = right.spatialProperties.coordinates;

    const leftSideCollision = !(leftCoords.right < rightCoords.left)
    const rightSideCollision = !(leftCoords.left > rightCoords.right)
    const topSideCollision = !(leftCoords.bottom < rightCoords.top)
    const bottomSideCollision = !(leftCoords.top > rightCoords.bottom)

    return {
      collissions: {
        left: leftSideCollision,
        right: rightSideCollision,
        top: topSideCollision,
        bottom: bottomSideCollision
      },
    };
  }
}
