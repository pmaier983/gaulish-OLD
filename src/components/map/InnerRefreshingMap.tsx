import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import { Cell } from "./Cell"
import { useMapContext } from "@/context/MapProvider"
import { useEffect, useState } from "react"
import { useShipContext } from "@/context/ShipProvider"
import { updateMap } from "./utils"

let count = 0

export const InnerRefreshingMap = () => {
  console.log("-> Render InnerRefreshingMap", count++)
  // TODO: stop constant re-renders!
  const { cellSize, map, mapHeight, mapWidth, npcs } = useMapContext()
  const [innerMap, setInnerMap] = useState(map)
  const { shipPath, selectedShipId } = useShipContext()

  useEffect(() => {
    /*
      This function is called on interval and on immediate change
    */
    const newMap = () => {
      const mapClone = updateMap({ npcs, map, shipPath, selectedShipId })

      // TODO: do actual deep equality check here
      if (JSON.stringify(mapClone) !== JSON.stringify(innerMap)) {
        setInnerMap(mapClone)
      }
    }

    /*
      This section controls interval loads
    */
    const intervalId = setInterval(() => {
      // TODO: a better way to do this?
      newMap()
    }, 1000)

    /*
      This section control immediate changes
    */
    newMap()

    return () => clearInterval(intervalId)
  }, [innerMap, map, npcs, selectedShipId, shipPath])

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
              data={innerMap[props.columnIndex][props.rowIndex]}
            />
          )}
        </VirtualizedGrid>
      )}
    </AutoSizer>
  )
}
