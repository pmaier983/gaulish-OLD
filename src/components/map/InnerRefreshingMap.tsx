import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import clone from "just-clone"

import { Cell } from "./Cell"
import { useMapContext } from "@/context/MapProvider"
import type { Map } from "./utils"
import type { Npc } from "@/generated/graphql"
import { useEffect, useState } from "react"
import { useShipContext } from "@/context/ShipProvider"

interface InnerRefreshingMapInputs {
  mapWidth: number
  mapHeight: number
  map: Map
  npcs: Npc[]
}

export const InnerRefreshingMap = ({
  mapWidth,
  mapHeight,
  map,
  npcs,
}: InnerRefreshingMapInputs) => {
  // TODO: stop constant re-renders!
  const [innerMap, setInnerMap] = useState(map)
  const { shipPath } = useShipContext()
  const { cellSize } = useMapContext()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shipPath.length) return
      // TODO: a better way to do this?
      const mapClone = clone(map)

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

      // TODO: do actual deep equality check here
      if (JSON.stringify(mapClone) !== JSON.stringify(innerMap)) {
        setInnerMap(mapClone)
      }
    }, 1000)
    return () => clearInterval(intervalId)
  })

  useEffect(() => {
    const mapClone = clone(map)
    shipPath.forEach((tileInPath, i) => {
      const { x, y } = tileInPath
      const mapTile = mapClone[x][y]
      mapClone[x][y] = { ...mapTile, pathIndex: i }
    })

    if (JSON.stringify(mapClone) !== JSON.stringify(innerMap)) {
      setInnerMap(mapClone)
    }
  }, [shipPath])

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
