import { useSocketContext } from "@/context/SocketProvider"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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

const StyledInput = styled.input`
  width: 100%;
  ${({ theme: { typography } }) => {
    return css`
      height: calc(${typography.fontSize} + 10px);
    `
  }}
`

interface ChatInput {
  chat: string
}

export const Chat = () => {
  const [chat, setChat] = useState<string[]>([])
  const { register, handleSubmit } = useForm<ChatInput>({})
  const { socket } = useSocketContext()

  useEffect(() => {
    const listener = (message: string) => {
      setChat((currentChat) => [...currentChat, message])
    }

    socket.on("globalChat", listener)

    return () => {
      socket.off("globalChat", listener)
    }
  }, [socket])

  const onSubmit = async (message: ChatInput) => {
    socket.emit("globalChat", message.chat, Date.now())
  }

  return (
    <StyledWrapper>
      <StyledChatBox>
        {chat.map((message) => (
          <div key={message}>{message}</div>
        ))}
      </StyledChatBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register("chat")} />
      </form>
    </StyledWrapper>
  )
}
