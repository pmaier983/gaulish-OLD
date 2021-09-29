import {
  FixedSizeGrid as VirtualizedGrid,
  GridChildComponentProps,
} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

export const Cell = ({ style }: GridChildComponentProps) => {
  return <div style={style}>I am cell</div>
}

export const Grid = () => (
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
