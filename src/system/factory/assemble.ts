import { services } from '../services/live';

type ImplementationKey = keyof typeof services

export function* assemble() {
  for (const [key, entry] of Object.entries(services)) {
    yield ([key, entry] as [ImplementationKey, typeof services[ImplementationKey]])
  }
}