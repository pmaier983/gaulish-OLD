import { gql } from "graphql-request"
import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"
import { useQuery } from "@/hooks/useQuery"
import { useSubscription } from "@/hooks/useSubscription"
import { useForm } from "react-hook-form"

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 100px;
  background-color: lightgray;
`

interface ChatForm {
  submitGlobalChat: string
}

export const ChatBox = () => {
  const { user } = useUserContext()
  const { register, watch } = useForm<ChatForm>()

  const globalChatText = watch("submitGlobalChat")

  const { data } = useSubscription({
    query: gql`
      subscription {
        globalChat {
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
    <StyledWrapper>
      Chats: {JSON.stringify(data)}
      <input
        {...register("submitGlobalChat")}
        placeholder="chat globally"
        onKeyDown={async (e) => {
          if (e.key === "Enter" && !!globalChatText) {
            refetch()
          }
        }}
      />
    </StyledWrapper>
  )
}
