import { useMemo } from "react"
import styled, { css } from "styled-components"
import { gql } from "graphql-request"

import { useQuery } from "@/hooks/useQuery"
import { getMapDimensions } from "@/utils/helperFunctions"
import { buildMap } from "./utils"
import { InnerRefreshingMap } from "./InnerRefreshingMap"

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Map = () => {
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
      <InnerRefreshingMap mapHeight={mapHeight} mapWidth={mapWidth} map={map} />
    </StyledWrapper>
  )
}
