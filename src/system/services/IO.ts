import { Context } from "effect";
import type { SpatialObject } from "../types";

export class IOService extends Context.Service<IOService, IO>()("IOService") {}

const ARROW_KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight"
} as const;

const WASD = {
  W: "w",
  A: "a",
  S: "s",
  D: "d"
} as const;

type ArrowKey = typeof ARROW_KEYS[keyof typeof ARROW_KEYS];
type WasdKey = typeof WASD[keyof typeof WASD];

export class IO {
  keysPressed: Record<string, boolean> = {}; 
  controllerInterface: Window;
  connectedObject?: SpatialObject;
  gameplayState: { gameplay: string } = { gameplay: 'idle' };
  deltas: { leftX: number, rightX: number, upY: number, downY: number };
  constructor(controllerInterface: Window, deltas: { leftX: number, rightX: number, upY: number, downY: number }) {
    this.controllerInterface = controllerInterface;
    this.deltas = deltas;
  }

  move() {
    for (const key in this.keysPressed) {
      switch (key) {
      // case ARROW_KEYS.ARROW_UP:
      // case WASD.W:
      //   this.connectedObject!.spatialProperties.pos.y -= this.deltas.upY;
      //   break;
      case ARROW_KEYS.ARROW_DOWN:
      case WASD.S:
        this.connectedObject!.spatialProperties.pos.y += this.deltas.downY;
        break;
      case ARROW_KEYS.ARROW_LEFT:
      case WASD.A:
        this.connectedObject!.spatialProperties.pos.x -= this.deltas.leftX;
        break;
      case ARROW_KEYS.ARROW_RIGHT:
      case WASD.D:
        this.connectedObject!.spatialProperties.pos.x += this.deltas.rightX;
        break;
      default:
        break;
      }
    }

    this.connectedObject!.spatialProperties.pos.y += this.deltas.downY;
  }

  jump() {

  }


  handleKeyDown(e: KeyboardEvent) {
    if (this.gameplayState.gameplay === 'paused') return;
    const keyAsArrowKey = e.key as ArrowKey;
    const keyAsWasdKey = e.key as WasdKey;
    if (!Object.values(ARROW_KEYS).includes(keyAsArrowKey) && !Object.values(WASD).includes(keyAsWasdKey)) return;
    this.keysPressed[e.key] = true;
  }

  handleKeyUp(e: KeyboardEvent) {
    delete this.keysPressed[e.key];
  }

  connect(object: SpatialObject, gameplayState: { gameplay: string }) {
    this.connectedObject = object;
    this.controllerInterface.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.controllerInterface.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.gameplayState = gameplayState;
  }

  disconnect() {
    this.controllerInterface.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.controllerInterface.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.connectedObject = undefined;
    this.gameplayState.gameplay = 'idle';
  }
}