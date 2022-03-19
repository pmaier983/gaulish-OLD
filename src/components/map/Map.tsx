import { useMemo } from "react"
import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled, { css } from "styled-components"
import { gql } from "graphql-request"

import { useMapContext } from "@/context/MapProvider"
import { useQuery } from "@/hooks/useQuery"
import { getMapDimensions } from "@/utils/helperFunctions"
import { Cell } from "@/components"
import { buildMap } from "./utils"

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Map = () => {
  const { cellSize } = useMapContext()

  // TODO: handle Error
  // TODO: fix useQuery I mean really
  // TODO: use .gql files
  const { isLoading, data } = useQuery({
    key: "getMap",
    query: gql`
      {
        getAllTiles {
          id
          tile_id
          x
          y
          type
        }
        getAllCities {
          id
          city_id
          name
          tile {
            id
            tile_id
            x
            y
            type
          }
        }
      }
    `,
  })

  const [mapWidth, mapHeight] = getMapDimensions(data?.getAllTiles)

  const map = useMemo(
    () =>
      buildMap({
        cities: data?.getAllCities,
        tiles: data?.getAllTiles,
        mapHeight,
        mapWidth,
      }),
    [data, mapWidth, mapHeight]
  )

  // TODO: handle no data state better?
  if (isLoading || !map) {
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
              <Cell {...props} data={map[props.columnIndex][props.rowIndex]} />
            )}
          </VirtualizedGrid>
        )}
      </AutoSizer>
    </StyledWrapper>
  )
}
