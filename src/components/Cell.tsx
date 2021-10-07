import type { GridChildComponentProps } from "react-window"
import styled, { css } from "styled-components"

import { Tile, TileTypes } from "@/generated/graphql"

interface StyledWrapperProps {
  type: TileTypes
}

// TODO: is this the best way to do this?
const StyledWrapper = styled.div<StyledWrapperProps>`
  ${({ type }) => {
    switch (type) {
      case TileTypes.Forest: {
        return css`
          background: brown;
        `
      }
      case TileTypes.Meadows: {
        return css`
          background: green;
        `
      }
      case TileTypes.Mountains: {
        return css`
          background: grey;
        `
      }
      case TileTypes.Ocean: {
        return css`
          background: blue;
        `
      }
      default:
        console.error("This cell type is not supported")
        return css``
    }
  }}
`

export const Cell = ({ style, data }: GridChildComponentProps<Tile>) => {
  return <StyledWrapper style={style} type={data.type}></StyledWrapper>
}
