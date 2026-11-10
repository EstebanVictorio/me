import { CollisionDetectionService } from './CollisionDetection'
import { GameEngineService } from './GameEngine'

export const services = {
  GameEngineService,
  CollisionDetectionService
}

export type Live = typeof services[keyof typeof services]