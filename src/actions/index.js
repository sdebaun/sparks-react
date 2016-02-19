export const POPOUT_TOGGLE = 'POPOUT_TOGGLE'
export const ACCEPT_INVITE = 'ACCEPT_INVITE'
export const DIALOG_TOGGLE = 'DIALOG_TOGGLE'

export function popoutToggle(open) {
  return {
    type: POPOUT_TOGGLE,
    open
  }
}

export function dialogToggle(key,open) {
  return {
    type: DIALOG_TOGGLE,
    open
  }
}

export function acceptProjectInvite(key, invite) {
  return {
    type: ACCEPT_INVITE,
    key,
    invite
  }
}
