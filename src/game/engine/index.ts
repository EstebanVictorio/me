import { loop, actor } from '../state/loop'
import { Ball } from '../entities/ball'
import { Context } from 'effect';


export class GameEngineService extends Context.Service<GameEngineService, GameEngine>()("GameEngineService")  {}

export class GameEngine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null = null;
  ball: Ball | null = null;
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) throw new Error('Canvas element is required');
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
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

  _setContextObjectProperties(context: CanvasRenderingContext2D, ball: Ball) {
    context.fillStyle = 'red'; // Set the fill color for the ball
  }

  _draw() {
    const context = this.canvas.getContext('2d')!;
    this.ball = new Ball({
      id: 'ball',
      spatialProperties: {
        pos: { x: 40, y: 50 },
        size: { width: 10, height: 10 },
        coordinates: {
          top: 50,
          left: 50,
          right: 60,
          bottom: 60
        },
      }
    });

    this._setContextObjectProperties(context, this.ball);
    context.beginPath();
    context.arc(
      this.ball.spatialProperties.pos.x,
      this.ball.spatialProperties.pos.y,
      this.ball.spatialProperties.size.width / 2,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  start() {
    actor.start();
    this._update();
  }


  _update() {
    do {
      requestAnimationFrame(() => this._draw());
    } while (true);
  }
}