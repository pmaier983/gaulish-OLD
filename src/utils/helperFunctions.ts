import type { Tile } from "@/generated/graphql"

const getMapHeight = (map?: Tile[]) => {
  if (!map) return 0
  return map?.reduce((acc, cur) => {
    if (cur.x === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}

const getMapWidth = (map?: Tile[]) => {
  if (!map) return 0
  return map?.reduce((acc, cur) => {
    if (cur.y === 0) {
      return acc + 1
    }
    return acc
  }, 0)
}

export const getMapDimensions = (map?: Tile[]) => {
  return [getMapWidth(map), getMapHeight(map)]
}
