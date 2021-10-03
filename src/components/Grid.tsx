import {
  FixedSizeGrid as VirtualizedGrid,
  GridChildComponentProps,
} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled from "styled-components"

import { useGridContext } from "@/context/GridProvider"

const StyledWrapper = styled.div`
  grid-area: grid;
`

export const Cell = ({ style }: GridChildComponentProps) => {
  return <div style={style}>I am cell</div>
}

export const Grid = () => {
  const { cellSize } = useGridContext()
  return (
    <StyledWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <VirtualizedGrid
            height={height}
            width={width}
            columnCount={100}
            columnWidth={cellSize}
            rowCount={100}
            rowHeight={cellSize}
          >
            {Cell}
          </VirtualizedGrid>
        )}
      </AutoSizer>
    </StyledWrapper>
  )
}
