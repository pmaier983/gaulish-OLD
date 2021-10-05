import {
  FixedSizeGrid as VirtualizedGrid,
  GridChildComponentProps,
} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled from "styled-components"

import { useMapContext } from "@/context/MapProvider"

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Cell = ({ style }: GridChildComponentProps) => {
  return <div style={style}>I am cell</div>
}

export const Map = () => {
  const { cellSize } = useMapContext()
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
