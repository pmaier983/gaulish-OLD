import { LOCAL_STORAGE_KEYS } from "@/utils/constants"

// TODO: simplify this (make it pretty, so ugly rn)
export const toggleWebsocketsEnabled = (newWebsocketState?: boolean) => {
  const currentWebsocketState = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED
  )
  if (newWebsocketState == null) {
    if (currentWebsocketState) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)
    } else {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED,
        "TRUE"
      )
    }
  } else if (newWebsocketState !== !!currentWebsocketState) {
    if (newWebsocketState) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED,
        "TRUE"
      )
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)
    }
  }
}
