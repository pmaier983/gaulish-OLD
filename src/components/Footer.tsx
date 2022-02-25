import styled from "styled-components"
import { Ships } from "./Ships"

const StyledWrapper = styled.div`
  grid-area: footer;
`

export const Footer = () => {
  return (
    <StyledWrapper>
      <Ships />
    </StyledWrapper>
  )
}
