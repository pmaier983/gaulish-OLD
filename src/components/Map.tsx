import { useMemo } from "react"
import { FixedSizeGrid as VirtualizedGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styled, { css } from "styled-components"
import { gql } from "graphql-request"

import { useMapContext } from "@/context/MapProvider"
import { useQuery } from "@/hooks/useQuery"
import { getMapHeight, getMapWidth } from "@/utils/helperFunctions"
import { Cell } from "@/components"

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Map = () => {
  const { cellSize } = useMapContext()

  // TODO: handle Error
  // TODO: fix useQuery I mean really
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

  const tiles = data?.getAllTiles
  const cities = data?.getAllCities

  const mapWidth = getMapWidth(tiles)
  const mapHeight = getMapHeight(tiles)

  const map = useMemo(() => {
    if (!tiles || !cities) return
    // TODO: do this immutably
    const mapArray = Array.from(Array(mapWidth), () => Array(mapHeight))
    tiles.forEach((tile) => {
      mapArray[tile.x][tile.y] = { tile }
    })
    cities.forEach((city) => {
      if (city?.tile) {
        const currentMapTile = mapArray[city?.tile.x][city?.tile.y]
        mapArray[city?.tile.x][city?.tile.y] = { ...currentMapTile, city: city }
      }
    })
    return mapArray
  }, [tiles, cities, mapWidth, mapHeight])

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

  // TODO: have a second grid above the first to visualize the moving parts.
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
