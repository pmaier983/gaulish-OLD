import type { Npc, ShipType } from "@/generated/graphql"
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

// TODO: how to calculate ship ranking
export const getShipRanking = (ship: ShipType) => {
  return ship.cargo_capacity + ship.inventory_slots + ship.speed
}

export const upperCaseFirstLetter = (string?: React.ReactChild) => {
  if (!string) return string
  if (typeof string !== "string") return string
  return string[0].toLocaleUpperCase() + string.slice(1, string.length)
}

export const getStrongestNpc = (npcs?: Npc[]): Npc | undefined => {
  if (!npcs || npcs.length === 0) return
  return npcs.reduce((acc, cur) => {
    if (getShipRanking(cur.ship_type) > getShipRanking(acc.ship_type))
      return cur
    return acc
  }, npcs[0])
}

export const doesPathIncludeTile = ({
  path,
  tile,
}: {
  path: Tile[]
  tile: Tile
}) =>
  path.reduce((acc, cur) => {
    if (acc) return acc
    return tile.x === cur.x && tile.y === cur.y
  }, false)

export const shipPathArrayToString = (shipPath: Tile[]) => {
  return shipPath.reduce((acc, cur, i) => {
    if (i === 0) return acc + cur.x + "," + cur.y
    return acc + "|" + cur.x + "," + cur.y
  }, "")
}
