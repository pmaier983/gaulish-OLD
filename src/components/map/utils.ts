import type { City, Tile, Npc } from "@/generated/graphql"

type onCellClick = (cell: Cell) => void

interface BuildMap {
  tiles?: Tile[]
  cities?: City[]
  mapWidth: number
  mapHeight: number
  onClick: onCellClick
}

export type Cell = {
  tile: Tile
  city?: City
  npcs?: Npc[]
  pathIndex?: number
  onClick: onCellClick
}

export type Map = Cell[][]

export const buildMap = ({
  tiles,
  cities,
  mapWidth,
  mapHeight,
  onClick,
}: BuildMap): Map | undefined => {
  if (!tiles || !cities) return
  // TODO: do this immutably
  const mapArray = Array.from(Array(mapWidth), () => Array(mapHeight))
  tiles.forEach((tile) => {
    mapArray[tile.x][tile.y] = { tile, onClick }
  })
  cities.forEach((city) => {
    const currentMapTile = mapArray[city.tile.x][city.tile.y]
    mapArray[city.tile.x][city.tile.y] = { ...currentMapTile, city: city }
  })
  return mapArray
}
