import type { GridChildComponentProps } from "react-window"
import styled, { css } from "styled-components"

import { Tile, TileTypes } from "@/generated/graphql"
import type { Cell as MapCell } from "./utils"

interface StyledWrapperProps {
  type?: TileTypes
}

// TODO: is this the best way to do this?
const StyledWrapper = styled.div<StyledWrapperProps>`
  ${({ theme: { colors } }) => {
    return css`
      &:hover {
        border: 3px solid ${colors.alert};
      }
    `
  }}
  ${({ type, theme: { colors } }) => {
    switch (type) {
      case TileTypes.Forest: {
        return css`
          background: ${colors.brown};
        `
      }
      case TileTypes.Meadows: {
        return css`
          background: ${colors.green};
        `
      }
      case TileTypes.Mountains: {
        return css`
          background: ${colors.grey};
        `
      }
      case TileTypes.Ocean: {
        return css`
          background: ${colors.blue};
        `
      }
      default:
        console.error("This cell type is not supported. Type:", type)
        return css``
    }
  }}
`

export interface CellType {
  cell: MapCell
  onShipPathClick: (tile?: Tile) => void
}

// TODO: reduce re-renders via memoization!
// https://react-window.vercel.app/#/examples/list/memoized-list-items
export const Cell = ({ style, data }: GridChildComponentProps<CellType>) => {
  const {
    cell: { city, tile, npcs, pathIndex },
    onShipPathClick,
  } = data

  // if part of a ship path
  if (pathIndex !== undefined) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onShipPathClick()}
      >
        {pathIndex}
      </StyledWrapper>
    )
  }

  // if it is a city
  if (city) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onShipPathClick(tile)}
      >
        {city.name}
      </StyledWrapper>
    )
  }

  // if its an npc
  if (npcs) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onShipPathClick(tile)}
      >
        {npcs?.at(-1)?.ship_type.name}
      </StyledWrapper>
    )
  }

  // default tile
  return (
    <StyledWrapper
      style={style}
      type={tile.type}
      onClick={() => onShipPathClick(tile)}
    ></StyledWrapper>
  )
}
