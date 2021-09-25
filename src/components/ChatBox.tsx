import { useEffect, useRef } from "react"
import { gql } from "graphql-request"
import styled, { css } from "styled-components"
import { useForm } from "react-hook-form"

import type { Chat } from "@/generated/graphql"
import { useUserContext } from "@/context/UserProvider"
import { useQuery } from "@/hooks/useQuery"
import { useSubscription } from "@/hooks/useSubscription"
import { MAX_CHARACTERS_IN_CHAT } from "@/utils/constants"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  height: 150px;
  font-size: 12px;
  background-color: lightgray;
`

const StyledChatInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

// TODO: make this
const StyledCharacterCounter = styled.span`
  width: 100px;
  text-align: center;
`

const StyledChatInput = styled.input`
  width: 100%;
`

interface ChatForm {
  submitGlobalChat: string
}

export const ChatBox = () => {
  const { user } = useUserContext()
  const { register, watch } = useForm<ChatForm>()

  const globalChatText = watch("submitGlobalChat")

  const { data } = useSubscription<"globalChat">({
    query: gql`
      subscription {
        globalChat {
          id
          time
          text
          username
        }
      }
    `,
  })

  const { refetch } = useQuery({
    key: "chatGlobally",
    query: gql`
      mutation ChatGlobally($text: String!, $username: String!) {
        chatGlobally(text: $text, username: $username)
      }
    `,
    variables: {
      // TODO: properly type both of these
      text: globalChatText?.slice(0, MAX_CHARACTERS_IN_CHAT),
      username: user?.username as string,
    },
  })

  return (
    <StyledContainer>
      <ChatContent
        messages={[...data, ...(nope as any)].map(
          (message) => message.globalChat
        )}
      />
      <StyledChatInputContainer>
        <StyledChatInput
          {...register("submitGlobalChat")}
          placeholder="chat globally"
          autoComplete="off"
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !!globalChatText) {
              refetch()
            }
          }}
        />

        <StyledCharacterCounter
          css={
            globalChatText?.length > MAX_CHARACTERS_IN_CHAT
              ? css`
                  color: ${({ theme }) => theme.color.alert};
                  font-weight: bold;
                `
              : css``
          }
        >
          {globalChatText?.length} / {MAX_CHARACTERS_IN_CHAT}
        </StyledCharacterCounter>
      </StyledChatInputContainer>
    </StyledContainer>
  )
}

const StyledChatContent = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`

const ChatContent = ({ messages }: { messages: Chat[] }) => {
  // const { user } = useUserContext()
  const lastChatMessageRef = useRef<HTMLParagraphElement>(null)
  const chatContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const innerChatContentRef = chatContentRef.current
    const innerLastChatMessageRef = lastChatMessageRef?.current

    // only scroll to bottom if the user is already at the bottom
    if (
      innerChatContentRef &&
      innerLastChatMessageRef &&
      innerChatContentRef.scrollHeight -
        innerChatContentRef.clientHeight -
        innerLastChatMessageRef.clientHeight ===
        innerChatContentRef.scrollTop
    ) {
      lastChatMessageRef.current?.scrollIntoView()
    }
  }, [messages.length])

  return (
    <StyledChatContent ref={chatContentRef}>
      {messages.map(({ username, text, id }, i) => (
        <p key={id} ref={i === messages.length - 1 ? lastChatMessageRef : null}>
          {username}: {text}
        </p>
      ))}
    </StyledChatContent>
  )
}
