import { Context } from 'effect'
import { Ball } from '../../game/entities/ball';

export class GameEngineService extends Context.Service<GameEngineService, GameEngine>()("GameEngineService")  {}

export class GameEngine {
  canvas: HTMLCanvasElement;
  offscreenCanvas: OffscreenCanvas | null = null;
  context: CanvasRenderingContext2D | null = null;
  ball: Ball;
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) throw new Error('Canvas element is required');

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    
    this.ball = new Ball({
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
  }

  _setContextObjectProperties(context: OffscreenCanvasRenderingContext2D, ball: Ball) {
    context.fillStyle = 'red'; // Set the fill color for the ball
  }

  _draw(pos: Pick<Ball['spatialProperties'], 'pos'>['pos']) {
    const offscreenCtx = this.offscreenCanvas?.getContext('2d')!
    this.ball.spatialProperties.pos = pos;
    this._setContextObjectProperties(offscreenCtx, this.ball);
    offscreenCtx.beginPath();
    offscreenCtx.arc(
      this.ball.spatialProperties.pos.x,
      this.ball.spatialProperties.pos.y,
      this.ball.spatialProperties.size.width / 2,
      0,
      Math.PI * 2
    );
    offscreenCtx.fill();
    this.context?.drawImage(this.offscreenCanvas!, 0, 0);
  }

  start(pos: Pick<Ball['spatialProperties'], 'pos'>['pos']) {
    this._update(pos);
  }


  _update(pos: Pick<Ball['spatialProperties'], 'pos'>['pos']) {
    requestAnimationFrame(() => this._draw(pos))
  }
}