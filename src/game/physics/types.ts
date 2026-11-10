import { Context } from 'effect'
import type { GameObject } from '../types';

interface Trait<O> {
  collides: (left: O, right: O) => boolean;
}

export class CollisionDetectionService extends Context.Service<CollisionDetectionService, Trait<GameObject>>()("CollisionDetection") {}
