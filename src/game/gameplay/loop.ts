import { Effect } from 'effect'
import { actor } from '../../game/state/loop';
import { Ball } from '../../game/entities/ball';
import { GameEngineService } from '../../system/services/GameEngine';
import { CollisionDetectionService } from '../../system/services/CollisionDetection';
import { IOService } from '../../system/services/IO';
import type { GameObject } from '../types';
import { DELTA_ACCELERATION, DELTAS } from '../state/delta';

type Success = void
type Failure = never
type Live = GameEngineService | CollisionDetectionService | IOService



export const loop: Effect.Effect<Success, Failure, Live> = Effect.gen(function*() {
  const gameEngineService = yield* GameEngineService;
  const collisionDetectionService = yield* CollisionDetectionService;
  const ioService = yield* IOService;
  const world = gameEngineService.getWorldArea();
  const BALL_SIZE = world.right / 20;
  const INITIAL_WORLD_BOUND_BALL_RANDOM_X = Math.round(Math.random() * (world.right - BALL_SIZE));
  const INITIAL_WORLD_BOUND_BALL_RANDOM_Y = Math.round(Math.random() * (world.bottom - BALL_SIZE));
  const ball = new Ball({
    id: 'ball',
    spatialProperties: {
      pos: { x: INITIAL_WORLD_BOUND_BALL_RANDOM_X, y: INITIAL_WORLD_BOUND_BALL_RANDOM_Y },
      size: { width: BALL_SIZE, height: BALL_SIZE },
    }
  });

  let gameplayState = { gameplay:'running' }

  ioService.connect(ball, gameplayState);

  const worldLeftSide: GameObject = {
    id: 'worldLeftSide',
    spatialProperties: {
      pos: { x: -20, y: 0 },
      size: { width: 20, height: world.bottom }
    }
  }

  const worldRightSide: GameObject = {
    id: 'worldRightSide',
    spatialProperties: {
      pos: { x: world.right, y: 0 },
      size: { width: 20, height: world.bottom }
    }
  }

  const worldTopSide: GameObject = {
    id: 'worldTopSide',
    spatialProperties: {
      pos: { x: 0, y: -20 },
      size: { width: world.right, height: 20 }
    }
  }

  const worldBottomSide: GameObject = {
    id: 'worldBottomSide',
    spatialProperties: {
      pos: { x: 0, y: world.bottom },
      size: { width: world.right, height: 20 }
    }
  }

  const walls = {
    left: worldLeftSide,
    right: worldRightSide,
    top: worldTopSide,
    bottom: worldBottomSide
  };

  const sub = actor.subscribe((state) => {
    gameplayState.gameplay = state.value as string;
  })


  do {
    yield Effect.sleep('30 milli');
    if (gameplayState.gameplay === 'paused') continue
    if (gameplayState.gameplay === 'idle') {
      sub.unsubscribe();
      gameEngineService.destroy();
      ioService.disconnect();
      break;
    }
    gameEngineService.render(ball.spatialProperties.pos, ball.spatialProperties.size);

    const leftWallCollision = collisionDetectionService.calcCollissions(ball, walls.left);
    const rightWallCollision = collisionDetectionService.calcCollissions(ball, walls.right);

    const topWallCollision = collisionDetectionService.calcCollissions(ball, walls.top);
    const bottomWallCollision = collisionDetectionService.calcCollissions(ball, walls.bottom);
    DELTAS.rightX = rightWallCollision.left ? 0 : DELTA_ACCELERATION;
    DELTAS.leftX = leftWallCollision.right ? 0 : DELTA_ACCELERATION;
    DELTAS.upY = topWallCollision.bottom ? 0 : DELTA_ACCELERATION;
    DELTAS.downY = bottomWallCollision.top ? 0 : DELTA_ACCELERATION;
    ioService.move();
  } while (['paused', 'running'].includes(gameplayState.gameplay))
})