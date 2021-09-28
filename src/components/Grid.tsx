import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

export const Cell = ({ style }: any) => {
  return <div style={style}>I am cell</div>
}

export const Grid = () => {
  // TODO: use react-virtualized-auto-sizer to auto-size
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedGrid
          height={height}
          width={width}
          columnCount={1000}
          columnWidth={100}
          rowCount={1000}
          rowHeight={100}
        >
          {Cell}
        </VirtualizedGrid>
      )}
    </AutoSizer>
  )
}
