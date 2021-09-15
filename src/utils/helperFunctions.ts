import { LOCAL_STORAGE_KEYS } from "@/utils/enums"

export const toggleWebsocketsEnabled = (newWebsocketState?: boolean) => {
  // only update the websocket state if you're changing to a new websocket state
  if (newWebsocketState == null) {
  }
  if (
    newWebsocketState !==
    !!window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)
  ) {
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
