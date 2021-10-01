import styled from "styled-components"
import { Grid } from "."

const StyledWrapper = styled.div`
  grid-area: map;
`

export const Map = () => {
  return (
    <StyledWrapper>
      <Grid />
    </StyledWrapper>
  )
}
