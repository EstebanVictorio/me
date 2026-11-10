import { Effect, Layer } from 'effect'
import { type Live, type services } from '../../system/services/live'
import { assemble } from '../../system/factory/assemble'
import { actor } from '../state/loop'

type Success = void
type Failure = never

export const loop: Effect.Effect<Success, Failure, Live> = Effect.gen(function*() {
  const impl = Array.from(assemble()).reduce((acc, [key, entry]) => {
    acc[key] = entry
    return acc
  }, {} as Record<keyof typeof services, Live>)

  const sub = actor.subscribe(({ value }) => {
    console.log(value)
  })

  yield* Effect.try({
    try: function* () {
      do {
        yield Effect.sleep('1 second');
        console.log('Loop iteration')
      } while (true)
    },
    catch: (error) => {
      console.error(error)
      sub.unsubscribe()
    }
  })
})