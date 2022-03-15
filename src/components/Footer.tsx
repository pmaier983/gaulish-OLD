import styled from "styled-components"
import { Ships } from "./Ships"
import { Chat } from "./Chat"

const StyledWrapper = styled.div`
  grid-area: footer;
  display: flex;
  width: 100%;
`

export const Footer = () => {
  return (
    <StyledWrapper>
      <Chat />
      <Ships />
    </StyledWrapper>
  )
}
