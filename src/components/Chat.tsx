import { useSocketContext } from "@/context/SocketProvider"
import styled, { css } from "styled-components"

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`

const StyledChatBox = styled.div`
  flex: 1;
`

const StyledTextBox = styled.input`
  width: 100%;
  ${({ theme: { typography } }) => {
    return css`
      height: calc(${typography.fontSize} + 10px);
    `
  }}
`

export const Chat = () => {
  const { socket } = useSocketContext()
  console.log(socket)
  return (
    <StyledWrapper>
      <StyledChatBox>Text</StyledChatBox>
      <StyledTextBox />
    </StyledWrapper>
  )
}
