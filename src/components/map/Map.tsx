import { useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import { gql } from "graphql-request"

import { useQuery } from "@/hooks/useQuery"
import { getMapDimensions } from "@/utils/helperFunctions"
import { buildMap } from "./utils"
import { useMapContext } from "@/context/MapProvider"
import { InnerRefreshingMap } from "./InnerRefreshingMap"

const StyledWrapper = styled.div`
  grid-area: map;
  display: flex;
  // TODO: why is this needed?
  padding-top: 8px;
`

export const Map = () => {
  console.log("-> MAP RENDER")
  const {
    MAP_ACTIONS,
    dispatchMapAction,
    mapHeight: mapHeightFromContext,
    mapWidth: mapWidthFromContext,
  } = useMapContext()

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
        getAllNpcs {
          id
          start_time
          ship_type {
            id
            ship_type_id
            name
            cargo_capacity
            inventory_slots
            speed
          }
          path {
            id
            tile_id
            type
            x
            y
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
    [data?.getAllCities, data?.getAllTiles, mapHeight, mapWidth]
  )

  useEffect(() => {
    if (map) {
      dispatchMapAction({
        type: MAP_ACTIONS.SET_MAP,
        payload: {
          mapHeight,
          mapWidth,
          cities: data?.getAllCities,
          tiles: data?.getAllTiles,
          npcs: data?.getAllNpcs,
          map: map,
        },
      })
    }
  }, [
    MAP_ACTIONS.SET_MAP,
    data?.getAllCities,
    data?.getAllNpcs,
    data?.getAllTiles,
    dispatchMapAction,
    map,
    mapHeight,
    mapWidth,
  ])

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

  // TODO: handle no data state better?
  if (mapHeightFromContext === 0 && mapWidthFromContext === 0) {
    return <div>The Map and/or npcs did not load...</div>
  }

  return (
    <StyledWrapper>
      <InnerRefreshingMap />
    </StyledWrapper>
  )
}
