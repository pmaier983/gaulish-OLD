import type { City, Tile, Npc } from "@/generated/graphql"
import clone from "just-clone"

interface BuildMap {
  tiles?: Tile[]
  cities?: City[]
  mapWidth: number
  mapHeight: number
}

export interface Cell {
  tile: Tile
  city?: City
  npcs?: Npc[]
  pathIndex?: number
}

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

export const checkPath = {}

interface UpdateMapProps {
  npcs: Npc[]
  map: Map
  shipPath: Tile[]
  selectedShipId?: number
}

export const updateMap = ({
  npcs,
  map,
  shipPath,
  selectedShipId,
}: UpdateMapProps) => {
  const mapClone = clone(map)

  /*
    Move the npcs around the map
  */
  npcs.forEach((npc) => {
    const {
      start_time,
      path,
      ship_type: { speed },
    } = npc
    const timePassed = Date.now() - start_time
    const tilesMoves = Math.floor(timePassed / speed)
    const { x, y } = path[tilesMoves % path.length]
    const tile = mapClone[x][y]
    if (tile.npcs) {
      mapClone[x][y] = { ...tile, npcs: [...tile.npcs, npc] }
    } else {
      mapClone[x][y] = { ...tile, npcs: [npc] }
    }
  })

  if (selectedShipId !== undefined) {
    shipPath.forEach((tileInPath, i) => {
      const { x, y } = tileInPath
      const mapTile = mapClone[x][y]
      mapClone[x][y] = { ...mapTile, pathIndex: i }
    })
  }

  return mapClone
}
