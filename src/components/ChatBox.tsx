import { gql } from "graphql-request"
import styled, { css } from "styled-components"
import { useForm } from "react-hook-form"

import { useUserContext } from "@/context/UserProvider"
import { useQuery } from "@/hooks/useQuery"
import { useSubscription } from "@/hooks/useSubscription"
import type { Chat } from "@/generated/graphql"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 150px;
  background-color: lightgray;
`

const StyledChatContent = styled.div``

const StyledChatInputContainer = styled.div``

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
      text: "coding a react app lol.",
      username: "player1",
    },
  },
]

export const ChatBox = () => {
  const { user } = useUserContext()
  const { register, watch } = useForm<ChatForm>()

  const globalChatText = watch("submitGlobalChat")

  useSubscription<"globalChat">({
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
      text: globalChatText,
      username: user?.username as string,
    },
  })

  return (
    <StyledContainer>
      <ChatContent messages={data.map((message) => message.globalChat)} />
      <StyledChatInputContainer>
        <input
          {...register("submitGlobalChat")}
          placeholder="chat globally"
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !!globalChatText) {
              refetch()
            }
          }}
        />
      </StyledChatInputContainer>
    </StyledContainer>
  )
}

const ChatContent = ({ messages }: { messages: Chat[] }) => {
  const { user } = useUserContext()
  return (
    <StyledChatContent>
      {messages.map(({ username, text, id }) => {
        if (user?.username === username) {
          return (
            <p
              key={id}
              css={css`
                text-align: end;
              `}
            >
              {text}
            </p>
          )
        }
        return (
          <p key={id}>
            {username}: {text}
          </p>
        )
      })}
    </StyledChatContent>
  )
}
