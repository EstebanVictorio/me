import { Effect, Layer } from 'effect'


type Success = void
type Failure = never


export const loop: Effect.Effect<Success, Failure, void> = Effect.gen(function*() {})