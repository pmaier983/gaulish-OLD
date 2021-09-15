import { useSubscription } from "@/hooks/useSubscription"
import { gql } from "graphql-request"

export const ChatBox = () => {
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
  return <div>I am a chat box: {data}</div>
}
