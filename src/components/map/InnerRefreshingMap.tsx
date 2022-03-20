import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import clone from "just-clone"

import { Cell } from "./Cell"
import { useMapContext } from "@/context/MapProvider"
import type { Map } from "./utils"
import type { Npc } from "@/generated/graphql"
import { useEffect, useState } from "react"

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
  const { cellSize } = useMapContext()

  useEffect(() => {
    const intervalId = setInterval(() => {
      const mapClone = clone(map)

      npcs.forEach((npc) => {
        // TODO: a better way to do this?
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
