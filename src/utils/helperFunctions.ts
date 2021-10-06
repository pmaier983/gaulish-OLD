import type { Tile } from "@/generated/graphql"
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

export const getMapHeight = (map: Tile[]) => {
  return map.reduce((acc, cur) => {
    if (cur.x === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}

export const getMapWidth = (map: Tile[]) => {
  return map.reduce((acc, cur) => {
    if (cur.y === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}
