import type { GridChildComponentProps } from "react-window"
import styled, { css } from "styled-components"

import { Tile, TileTypes } from "@/generated/graphql"
import { Cell as MapCell, getSpecialCellType, SPECIAL_TILE_TYPE } from "./utils"
import { InnerCell } from "./InnerCell"
import { getStrongestNpc, upperCaseFirstLetter } from "@/utils/helperFunctions"

interface StyledWrapperProps {
  type?: TileTypes
  specialType?: SPECIAL_TILE_TYPE
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
    if (!type) {
      console.error("No Cell Type was provided")
      return
    }
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
  ${({ specialType, theme: { colors } }) => {
    if (!specialType) return
    switch (specialType) {
      case SPECIAL_TILE_TYPE.START: {
        return css`
          background-image: repeating-linear-gradient(
              45deg,
              ${colors.goGreen} 25%,
              transparent 25%,
              transparent 75%,
              ${colors.goGreen} 75%,
              ${colors.goGreen}
            ),
            repeating-linear-gradient(
              45deg,
              ${colors.goGreen} 25%,
              transparent 25%,
              transparent 75%,
              ${colors.goGreen} 75%,
              ${colors.goGreen}
            );
          background-position: 0 0, 10px 10px;
          background-size: 20px 20px;
        `
      }
      case SPECIAL_TILE_TYPE.PATH: {
        return css`
          background-size: 10px 10px;
          background-image: repeating-linear-gradient(
            to right,
            ${colors.grey},
            ${colors.grey} 1px,
            transparent 1px,
            transparent
          );
        `
      }
      case SPECIAL_TILE_TYPE.END: {
        return css`
          background-image: repeating-linear-gradient(
              45deg,
              ${colors.stopRed} 25%,
              transparent 25%,
              transparent 75%,
              ${colors.stopRed} 75%,
              ${colors.stopRed}
            ),
            repeating-linear-gradient(
              45deg,
              ${colors.stopRed} 25%,
              transparent 25%,
              transparent 75%,
              ${colors.stopRed} 75%,
              ${colors.stopRed}
            );
          background-position: 0 0, 10px 10px;
          background-size: 20px 20px;
        `
      }
      default:
        console.error(
          "This cell Special Type is not supported. SpecialType:",
          specialType
        )
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

  const isStartOfPath = pathIndex === 0

  // TODO: ship names should have a specific "style"
  /*
    Most Important Info
    ...
    least important Info
  */
  const infoOrder = [
    isStartOfPath ? "Start" : pathIndex?.toString(), // Index Info
    npcs?.length ? (
      <>
        {npcs.map(({ id }) => (
          <StyledRedDot key={id} />
        ))}
      </>
    ) : undefined, // NPC red dots
    getStrongestNpc(npcs)?.ship_type.name, // Strong NPC Ship Type Name
    isStartOfPath ? selectedShip?.name : undefined, // Selected Ship Name
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
      specialType={getSpecialCellType({ city, pathIndex })}
    >
      <InnerCell
        header={cityNameAbbreviation}
        main={upperCaseFirstLetter(centerText)}
        footer={bottomText}
      />
    </StyledWrapper>
  )
}
