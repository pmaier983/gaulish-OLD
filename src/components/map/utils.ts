import { City } from "@/generated/graphql"
import { Tile } from "@/generated/graphql"

interface BuildMap {
  tiles?: Tile[]
  cities?: City[]
  mapWidth: number
  mapHeight: number
}

export type Cell = { tile: Tile; city?: City }

export type Map = Cell[][]

export const buildMap = ({
  tiles,
  cities,
  mapWidth,
  mapHeight,
}: BuildMap): Map | undefined => {
  if (!tiles || !cities) return
  // TODO: do this immutably
  const mapArray = Array.from(Array(mapWidth), () => Array(mapHeight))
  tiles.forEach((tile) => {
    mapArray[tile.x][tile.y] = { tile }
  })
  cities.forEach((city) => {
    const currentMapTile = mapArray[city.tile.x][city.tile.y]
    mapArray[city.tile.x][city.tile.y] = { ...currentMapTile, city: city }
  })
  return mapArray
}
