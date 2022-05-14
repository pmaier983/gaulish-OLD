import { useCallback, useEffect, useState } from "react"
import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import type { Tile } from "@/generated/graphql"
import { useErrorContext } from "@/context/ErrorProvider"
import { useShipContext } from "@/context/ShipProvider"
import { useMapContext } from "@/context/MapProvider"

import { Cell } from "./Cell"
import { updateMap } from "./utils"

let count = 0

export const InnerRefreshingMap = () => {
  console.log("-> Render InnerRefreshingMap", count++)
  // TODO: stop constant re-renders!
  const { cellSize, map, mapHeight, mapWidth, npcs, isPaused } = useMapContext()
  const { dispatchErrorAction, ERROR_ACTIONS } = useErrorContext()
  const [innerMap, setInnerMap] = useState(map)
  const { shipPath, selectedShip, dispatchShipAction, SHIP_ACTIONS } =
    useShipContext()

  const onShipPathClick = useCallback(
    (tile: Tile) => {
      // do nothing if no ship is selected
      if (selectedShip === undefined) return
      // you cannot add the same tile you've already added
      const lastTileInPath = shipPath.at(-1)
      if (!lastTileInPath) {
        dispatchErrorAction({
          type: ERROR_ACTIONS.SET_ERROR,
          payload: "It seems there is no path to add to!?",
        })
        return
      }
      if (lastTileInPath.x === tile.x && lastTileInPath.y === tile.y) {
        dispatchErrorAction({
          type: ERROR_ACTIONS.SET_ERROR,
          payload: "Your ship must move at least 1 tile.",
        })
        return
      }
      if (
        Math.abs(lastTileInPath.x - tile.x) +
          Math.abs(lastTileInPath.y - tile.y) >
        1
      ) {
        dispatchErrorAction({
          type: ERROR_ACTIONS.SET_ERROR,
          payload: "Your move must be adjacent to the end of the current path.",
        })
        return
      }
      dispatchShipAction({
        type: SHIP_ACTIONS.ADD_TILE_SHIP_PATH,
        payload: tile,
      })
    },
    [
      ERROR_ACTIONS.SET_ERROR,
      SHIP_ACTIONS.ADD_TILE_SHIP_PATH,
      dispatchErrorAction,
      dispatchShipAction,
      selectedShip,
      shipPath,
    ]
  )

  const onShipPathRightClick = useCallback(() => {
    // do nothing if no ship is selected
    if (selectedShip === undefined) return
    dispatchShipAction({
      type: SHIP_ACTIONS.REMOVE_TILE_SHIP_PATH,
    })
  }, [SHIP_ACTIONS.REMOVE_TILE_SHIP_PATH, dispatchShipAction, selectedShip])

  useEffect(() => {
    if (isPaused) return
    /*
      This function is called on interval and on immediate change
    */
    const newMap = () => {
      const mapClone = updateMap({ npcs, map, shipPath, selectedShip })

      // TODO: do actual deep equality check here
      if (JSON.stringify(mapClone) !== JSON.stringify(innerMap)) {
        setInnerMap(mapClone)
      }
    }

    /*
      This section controls interval loads
    */
    const refreshIntervalId = setInterval(() => {
      newMap()
    }, 1000)

    /*
      This section control immediate changes
    */
    newMap()

    return () => clearInterval(refreshIntervalId)
  }, [innerMap, isPaused, map, npcs, selectedShip, shipPath])

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedGrid
          height={height}
          width={width}
          columnCount={mapWidth}
          columnWidth={cellSize}
          rowCount={mapHeight}
          rowHeight={cellSize}
        >
          {(props) => (
            <Cell
              {...props}
              data={{
                cell: innerMap[props.columnIndex][props.rowIndex],
                onClick: onShipPathClick,
                onContextMenu: onShipPathRightClick,
              }}
            />
          )}
        </VirtualizedGrid>
      )}
    </AutoSizer>
  )
}
