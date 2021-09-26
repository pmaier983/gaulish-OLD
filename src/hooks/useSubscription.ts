import { useState, useEffect } from "react"

// TODO: how to implement this into things?
import type { Subscription } from "@/generated/graphql"
import { websocketClient } from "@/client"

type Subscriptions = Omit<Subscription, "__typename">
type SubscriptionKeys = keyof Subscriptions

// TODO: create a top level Websocket that never closes?
export const useSubscription = <SubscriptionKey extends SubscriptionKeys>({
  query,
}: {
  query: string
}): { data: Pick<Subscriptions, SubscriptionKey>[] } => {
  // TODO: properly type
  const [allData, setAllData] = useState<Subscriptions[]>([])
  const [data, setData] = useState<Subscriptions>()

  useEffect(() => {
    // TODO implement query invalidation: https://github.com/tannerlinsley/react-query/issues/171
    new Promise((resolve, reject) => {
      websocketClient.subscribe<Subscriptions>(
        {
          query,
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          next: () => {},
          error: reject,
          // how to cleanup on complete?
          complete: () => {
            resolve(undefined)
          },
        }
      )
    })

    // TODO: how to properly type this?
    websocketClient.on("message", (response) => {
      setData((response as any)?.payload.data)
    })

    return () => {
      websocketClient.dispose()
    }
  }, [query])

  useEffect(() => {
    if (data) {
      setAllData([...allData, data])
    }
    /* We only want to update allData when a new data message comes in*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return { data: allData }
}
