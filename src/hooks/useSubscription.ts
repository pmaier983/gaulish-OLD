import { useState } from "react"
import { useEffect } from "react"
import { createClient } from "graphql-ws"

// TODO: how to implement this into things?
// import type { Query } from "@/generated/graphql"

const client = createClient({
  url: `ws://localhost:8080/graphql`,
})

// input {query}
// return {isLoading, data}
// TODO: create a top level Websocket that never closes?
export const useSubscription = ({ query }: { query: string }) => {
  // TODO: properly type
  const [data, setData] = useState<any>()
  const [isLoading, setLoadingState] = useState<boolean>(true)

  // TODO: handle query invalidation?
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Promise((resolve, reject) => {
      client.subscribe(
        {
          query,
        },
        {
          next: (newData) => {
            setData(newData)
            if (isLoading) setLoadingState(true)
          },
          error: reject,
          // how to cleanup on complete?
          complete: () => {
            resolve(data)
          },
        }
      )
    })
    //TODO: how to close socket?
  })

  return { data, isLoading }
}

// export const useSubscriptionQuery = () => {}
