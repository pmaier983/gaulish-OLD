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

const data: { globalChat: Chat }[] = [
  {
    globalChat: {
      id: "heyplayer11632367825810",
      time: "1632367825810",
      text: "hey",
      username: "player1",
    },
  },
  {
    globalChat: {
      id: "hiplayer11632367828567",
      time: "1632367828567",
      text: "hi",
      username: "player2",
    },
  },
  {
    globalChat: {
      id: "watcha up to?player11632367832508",
      time: "1632367832508",
      text: "watcha up to?",
      username: "player1",
    },
  },
  {
    globalChat: {
      id: "mining some coal hbu?player11632367837268",
      time: "1632367837268",
      text: "mining some coal hbu?",
      username: "player2",
    },
  },
  {
    globalChat: {
      id: "coding a react app lol.player11632367844210",
      time: "1632367844210",
      text: "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",
      username: "player1",
    },
  },
]

export const ChatBox = () => {
  const { user } = useUserContext()
  const { register, watch } = useForm<ChatForm>()

  const globalChatText = watch("submitGlobalChat")

  const { data: nope } = useSubscription<"globalChat">({
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
