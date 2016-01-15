export const POPOUT_TOGGLE = 'POPOUT_TOGGLE'

export function popoutToggle(open) {
  return {
    type: POPOUT_TOGGLE,
    open
  }
}
