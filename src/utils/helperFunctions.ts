import type { Tile } from "@/generated/graphql"

export const getMapHeight = (map?: Tile[]) => {
  if (!map) return 0
  return map?.reduce((acc, cur) => {
    if (cur.x === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}

export const getMapWidth = (map?: Tile[]) => {
  if (!map) return 0
  return map?.reduce((acc, cur) => {
    if (cur.y === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}
