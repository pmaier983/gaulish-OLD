import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import { Cell } from "./Cell"
import { useMapContext } from "@/context/MapProvider"
import type { Map } from "./utils"

interface InnerRefreshingMapInputs {
  mapWidth: number
  mapHeight: number
  map: Map
}

export const InnerRefreshingMap = ({
  mapWidth,
  mapHeight,
  map,
}: InnerRefreshingMapInputs) => {
  const { cellSize } = useMapContext()

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
            <Cell {...props} data={map[props.columnIndex][props.rowIndex]} />
          )}
        </VirtualizedGrid>
      )}
    </AutoSizer>
  )
}
