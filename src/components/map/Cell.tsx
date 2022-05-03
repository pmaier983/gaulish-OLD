import type { GridChildComponentProps } from "react-window"
import styled, { css } from "styled-components"

import { Tile, TileTypes } from "@/generated/graphql"
import type { Cell as MapCell } from "./utils"
import { InnerCell } from "./InnerCell"
import { getStrongestNpc, upperCaseFirstLetter } from "@/utils/helperFunctions"

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

const StyledRedDot = styled.div`
  background-color: red;
  // TODO: make this a % so cell size doesn't make things wonky
  width: 25px;
  height: 25px;
  border-radius: 100%;
`

export interface CellType {
  cell: MapCell
  onShipPathClick: (tile?: Tile) => void
}

// TODO: reduce re-renders via memoization!
// https://react-window.vercel.app/#/examples/list/memoized-list-items
export const Cell = ({ style, data }: GridChildComponentProps<CellType>) => {
  const {
    cell: { city, tile, npcs, pathIndex, selectedShip },
    onShipPathClick,
  } = data

  /*
    Most Important Info
    ...
    least important Info
  */
  const infoOrder = [
    pathIndex === 0 ? "Start" : pathIndex?.toString(), // Index Info
    npcs?.length ? (
      <>
        {npcs.map(({ id }) => (
          <StyledRedDot key={id} />
        ))}
      </>
    ) : undefined, // NPC red dots
    getStrongestNpc(npcs)?.ship_type.name, // Strong NPC Ship Type Name
    pathIndex === 0 ? selectedShip?.name : undefined, // Selected Ship Name
    city?.name, // City Name
  ].filter(Boolean)

  const cityNameAbbreviation = upperCaseFirstLetter(city?.name.slice(0, 2))

  const centerText = infoOrder.shift()
  const bottomText = infoOrder.shift()

  return (
    <StyledWrapper
      style={style}
      type={tile.type}
      onClick={() => onShipPathClick(tile)}
    >
      <InnerCell
        topLeftText={cityNameAbbreviation}
        centerText={upperCaseFirstLetter(centerText)}
        bottomText={bottomText}
      />
    </StyledWrapper>
  )
}
