import { useState } from "react"
import { useEffect } from "react"
import { createClient } from "graphql-ws"

// TODO: how to implement this into things?
import type { Subscription } from "@/generated/graphql"
import { LOCAL_STORAGE_KEYS } from "@/utils/enums"

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
    if (window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)) {
      // this empty subscription will open the websocket connection and keep it open
      // until the connection is closed
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
    }

    //TODO: how to close socket?
  })

  return { data }
}

// export const useSubscriptionQuery = () => {}
