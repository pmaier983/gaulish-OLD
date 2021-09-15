import { useState } from "react"
import { useEffect } from "react"
import { createClient } from "graphql-ws"

// TODO: how to implement this into things?
import type { Subscription } from "@/generated/graphql"

const client = createClient({
  url: `ws://localhost:8080/graphql`,
})

type PureSubscription = Omit<Subscription, "__typename">
type SubscriptionKeys = keyof PureSubscription
type SubscriptionTypes = PureSubscription[SubscriptionKeys]

// input {query}
// return {isLoading, data}
// TODO: create a top level Websocket that never closes?
export const useSubscription = <SubscriptionKey extends SubscriptionKeys>({
  query,
}: {
  query: string
}): { data?: PureSubscription[SubscriptionKey] } => {
  // TODO: properly type
  const [data, setData] = useState<SubscriptionTypes>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Promise((resolve, reject) => {
      client.subscribe<SubscriptionTypes>(
        {
          query,
        },
        {
          next: (newData) => {
            // TODO: is there a better way of doing this?
            setData(newData as SubscriptionTypes)
            // TODO implement query invalidation: https://github.com/tannerlinsley/react-query/issues/171
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

  return { data }
}

// export const useSubscriptionQuery = () => {}
