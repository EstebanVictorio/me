import { Effect, Layer } from 'effect'

import { Ball } from '../../game/entities/ball';
import { GameEngineService } from '../../system/services/GameEngine';
import { CollisionDetectionService } from '../../system/services/CollisionDetection';

type Success = void
type Failure = never
type Live = GameEngineService | CollisionDetectionService
export const loop: Effect.Effect<Success, Failure, Live> = Effect.gen(function*() {
  const gameEngineService = yield* GameEngineService;
  const collisionDetectionService = yield* CollisionDetectionService;

  const ball = new Ball({
    id: 'ball',
    spatialProperties: {
      pos: { x: 0, y: 0 },
      size: { width: 10, height: 10 },
      coordinates: {
        top: 50,
        left: 50,
        right: 60,
        bottom: 60
      },
    }
  });

  const contours = gameEngineService.getWorldSize();
  let xDelta = 10;
  let yDelta = 10;

  do {
    yield Effect.sleep('500 milli');
    const { collissions } = collisionDetectionService.calcCollissions(
      {
        ...ball,
        spatialProperties: {
          pos: { ...ball.spatialProperties.pos },
          size: { ...ball.spatialProperties.size },
          coordinates: ball.spatialProperties.coordinates,
        }
      },
      { id: 'world', spatialProperties: { coordinates: contours, pos: { x: 0, y: 0 }, size: { width: contours.right, height: contours.bottom } } }
    );

    const collisionExists = Object.values(collissions).some(Boolean);
    console.log('Collisions:', JSON.stringify(collissions, null, 2))
    if (collisionExists) {
      const { top, bottom, left, right } = collissions;
      if (top) yDelta = -Math.abs(yDelta);
      if (bottom) yDelta = Math.abs(yDelta);
      if (left) xDelta = -Math.abs(xDelta);
      if (right) xDelta = Math.abs(xDelta);
    }

    ball.spatialProperties.pos.x += xDelta;
    ball.spatialProperties.pos.y += yDelta;
    gameEngineService.draw(ball.spatialProperties.pos, ball.spatialProperties.size);

  } while (true)
})