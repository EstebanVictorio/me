import { Context } from 'effect'
import type { GameObject } from '../../game/types';
import type { SpatialObject } from '../types';


interface Trait<O> {
  calcCollissions: (left: O, right: O) => { left: boolean, right: boolean, top: boolean, bottom: boolean };
}

export class CollisionDetectionService extends Context.Service<CollisionDetectionService, Trait<GameObject>>()("CollisionDetectionService") {}

export class CollisionDetection {
  calcCollissions(a: SpatialObject, b: SpatialObject) {
    const { spatialProperties: { pos: { x: aX, y: aY }, size: { width: aWidth, height: aHeight } }, id: aId } = a
    const { spatialProperties: { pos: { x: bX, y: bY }, size: { width: bWidth, height: bHeight } }, id: bId } = b

    const aEdges = {
      left: aX,
      right: aX + aWidth,
      top: aY,
      bottom: aY + aHeight,
      id: aId
    }

    const bEdges = {
      left: bX,
      right: bX + bWidth,
      top: bY,
      bottom: bY + bHeight,
      id: bId
    }

    const bLeftEdgeCollision = aEdges.right >= bEdges.left
    const bRightEdgeCollision = aEdges.left <= bEdges.right

    const bTopEdgeCollision = aEdges.bottom >= bEdges.top
    const bBottomEdgeCollision = aEdges.top <= bEdges.bottom

    return {
      left: bLeftEdgeCollision,
      right: bRightEdgeCollision,
      top: bTopEdgeCollision,
      bottom: bBottomEdgeCollision,
    };
  }
}
