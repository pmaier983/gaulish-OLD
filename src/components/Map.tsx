import {
  FixedSizeGrid as VirtualizedGrid,
  GridChildComponentProps,
} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled, { css } from "styled-components"

import { useMapContext } from "@/context/MapProvider"
import { useQuery } from "@/hooks/useQuery"
import { gql } from "graphql-request"
import { getMapHeight, getMapWidth } from "@/utils/helperFunctions"
import type { Tile } from "@/generated/graphql"

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Cell = ({ style }: GridChildComponentProps) => {
  return <div style={style}>I am cell</div>
}

export const Map = () => {
  const { cellSize } = useMapContext()

  // TODO: handle Error
  const { isLoading, data } = useQuery({
    key: "getAllTiles",
    query: gql`
      {
        getAllTiles {
          id
          tile_id
          x
          y
          type
        }
      }
    `,
  })

  // TODO: fix useQuery I mean really
  const map = data?.getAllTiles as Tile[]

  // TODO: handle no data state better?
  if (isLoading || !data) {
    // TODO: nicer Loading icon
    return (
      <StyledWrapper
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        Loading...
      </StyledWrapper>
    )
  }

  return (
    <StyledWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <VirtualizedGrid
            height={height}
            width={width}
            columnCount={getMapWidth(map)}
            columnWidth={cellSize}
            rowCount={getMapHeight(map)}
            rowHeight={cellSize}
          >
            {Cell}
          </VirtualizedGrid>
        )}
      </AutoSizer>
    </StyledWrapper>
  )
}
