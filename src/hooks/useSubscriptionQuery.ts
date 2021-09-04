import { createClient, SubscribePayload } from "graphql-ws"

const client = createClient({
  url: `ws://localhost:8080/graphql`,
})

export async function execute<T>(payload: SubscribePayload) {
  return new Promise<T>((resolve, reject) => {
    let result: T
    client.subscribe<T>(payload, {
      next: (data) => (result = data),
      error: reject,
      complete: () => resolve(result),
    })
  })
}

// export const useSubscriptionQuery = () => {}
