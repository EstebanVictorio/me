import { createActor, createMachine } from 'xstate'


const state = createMachine({
  id: 'loop',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'running'
      }
    },
    running: {
      on: {
        STOP: 'idle'
      }
    },
    paused: {
      on: {
        RESUME: 'running',
        STOP: 'idle'
      }
    }
  }
})

const actor = createActor(state)

export {
  state,
  actor,
}