import type { GridChildComponentProps } from "react-window"
import styled, { css } from "styled-components"

import { TileTypes } from "@/generated/graphql"
import type { Cell as CellType } from "./utils"

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

// TODO: reduce re-renders via memoization!
// https://react-window.vercel.app/#/examples/list/memoized-list-items
export const Cell = ({ style, data }: GridChildComponentProps<CellType>) => {
  const { city, tile, npcs, pathIndex, onClick } = data

  if (pathIndex !== undefined) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onClick(data)}
      >
        {pathIndex}
      </StyledWrapper>
    )
  }

  if (npcs) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onClick(data)}
      >
        npc
      </StyledWrapper>
    )
  }

  if (city) {
    return (
      <StyledWrapper
        style={style}
        type={tile.type}
        onClick={() => onClick(data)}
      >
        {city.name}
      </StyledWrapper>
    )
  }
  return (
    <StyledWrapper
      style={style}
      type={tile.type}
      onClick={() => onClick(data)}
    ></StyledWrapper>
  )
}
