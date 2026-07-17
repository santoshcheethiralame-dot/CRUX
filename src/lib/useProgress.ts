import { useSyncExternalStore } from 'react'
import { subscribe } from './progress'

// Re-render any component when progress state changes.
export function useProgress() {
  return useSyncExternalStore(subscribe, () => localStorage.getItem('study-os:v1') ?? '')
}
