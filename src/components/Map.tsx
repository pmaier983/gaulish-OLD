import { useMemo } from "react"
import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled, { css } from "styled-components"
import { gql } from "graphql-request"

import { useMapContext } from "@/context/MapProvider"
import { useQuery } from "@/hooks/useQuery"
import { getMapHeight, getMapWidth } from "@/utils/helperFunctions"
import type { Tile } from "@/generated/graphql"
import { Cell } from "@/components"

const StyledWrapper = styled.div`
  grid-area: map;
`

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

  const mapWidth = getMapWidth(map)
  const mapHeight = getMapHeight(map)

  const mapArray = useMemo(() => {
    return map?.reduce(
      (accMapArray, currentTile) => {
        const { x, y } = currentTile
        accMapArray[x][y] = currentTile
        return accMapArray
      },
      Array.from(Array(mapWidth), () => Array(mapHeight))
    )
  }, [map, mapHeight, mapWidth])

  // TODO: handle no data state better?
  if (isLoading) {
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
            columnCount={mapWidth}
            columnWidth={cellSize}
            rowCount={mapHeight}
            rowHeight={cellSize}
          >
            {(props) => (
              <Cell
                {...props}
                data={mapArray[props.columnIndex][props.rowIndex]}
              />
            )}
          </VirtualizedGrid>
        )}
      </AutoSizer>
    </StyledWrapper>
  )
}
