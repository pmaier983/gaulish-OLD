import { useUserContext } from "@/context/UserProvider"
import { useQuery } from "@/hooks/useQuery"
import { useSubscription } from "@/hooks/useSubscription"
import { gql } from "graphql-request"
import { useForm } from "react-hook-form"
import styled from "styled-components"

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

  const { refetch } = useQuery({
    key: "chatGlobally",
    query: gql`
      mutation ChatGlobally($text: String!, $username: String!) {
        chatGlobally(text: $text, username: $username)
      }
    `,
    variables: {
      text: globalChatText,
      // TODO: properly type user
      username: user?.username as string,
    },
  })

  const data = useSubscription<"globalChat">({
    query: gql`
      subscription {
        globalChat {
          text
          username
        }
      }
    `,
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
