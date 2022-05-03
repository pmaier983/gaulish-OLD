import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import { Cell } from "./Cell"
import { useMapContext } from "@/context/MapProvider"
import { useCallback, useEffect, useState } from "react"
import { useShipContext } from "@/context/ShipProvider"
import { updateMap } from "./utils"
import type { Tile } from "@/generated/graphql"

let count = 0

export const InnerRefreshingMap = () => {
  console.log("-> Render InnerRefreshingMap", count++)
  // TODO: stop constant re-renders!
  const { cellSize, map, mapHeight, mapWidth, npcs } = useMapContext()
  const [innerMap, setInnerMap] = useState(map)
  const { shipPath, selectedShip, dispatchShipAction, SHIP_ACTIONS } =
    useShipContext()

  const onShipPathClick = useCallback(
    (tile?: Tile) => {
      console.log(tile, selectedShip)
      if (selectedShip !== undefined) {
        if (tile) {
          dispatchShipAction({
            type: SHIP_ACTIONS.ADD_TILE_SHIP_PATH,
            payload: tile,
          })
        } else {
          dispatchShipAction({
            type: SHIP_ACTIONS.REMOVE_TILE_SHIP_PATH,
            payload: tile,
          })
        }
      }
    },
    [
      SHIP_ACTIONS.ADD_TILE_SHIP_PATH,
      SHIP_ACTIONS.REMOVE_TILE_SHIP_PATH,
      dispatchShipAction,
      selectedShip,
    ]
  )

  useEffect(() => {
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
  }, [innerMap, map, npcs, selectedShip, shipPath])

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
                onShipPathClick,
              }}
            />
          )}
        </VirtualizedGrid>
      )}
    </AutoSizer>
  )
}
