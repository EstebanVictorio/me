import { Context } from 'effect'
export class GameEngineService extends Context.Service<GameEngineService, GameEngine>()("GameEngineService")  {}
export class GameEngine {
  canvas: HTMLCanvasElement;
  offscreenCanvas: OffscreenCanvas | null = null;
  context: CanvasRenderingContext2D | null = null;
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) throw new Error('Canvas element is required');

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
  }

  _setContextObjectProperties(context: OffscreenCanvasRenderingContext2D) {
    context.fillStyle = 'red'; // Set the fill color for the ball
  }

  _drawArc(pos: { x: number, y: number }, size: { width: number, height: number }) {
    const offscreenCtx = this.offscreenCanvas?.getContext('2d')!
    this._setContextObjectProperties(offscreenCtx);
    offscreenCtx.clearRect(0, 0, this.offscreenCanvas!.width, this.offscreenCanvas!.height);
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    offscreenCtx.beginPath();
    offscreenCtx.arc(
      pos.x,
      pos.y,
      size.width / 2,
      0,
      Math.PI * 2
    );
    offscreenCtx.fill();
    this.context?.drawImage(this.offscreenCanvas!, 0, 0);
  }

  getWorldSize() {
    return {
      top: 0,
      left: 0,
      right: this.canvas.width,
      bottom: this.canvas.height
    }
  }

  draw(pos: { x: number, y: number }, size: { width: number, height: number }) {
    requestAnimationFrame(() => this._drawArc(pos, size))
  }
}