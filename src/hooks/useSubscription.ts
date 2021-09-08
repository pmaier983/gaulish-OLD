import { useState } from "react"
import { useEffect } from "react"
import { createClient } from "graphql-ws"
import { gql } from "graphql-request"

const client = createClient({
  url: `ws://localhost:8080/graphql`,
})

export const useSubscription = () => {
  // TODO: properly type
  const [state, setState] = useState<any>()

  console.log("render")

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const socket = new Promise((resolve, reject) => {
      let result: any
      client.subscribe(
        {
          query: gql`
            subscription {
              greetings
            }
          `,
        },
        {
          next: (data) => {
            console.log("the data?", data)
            setState(data)
            return (result = data)
          },
          error: reject,
          complete: () => {
            resolve(result)
          },
        }
      )
    })
    // console.log("what is the socket?", socket)
    //TODO: how to close socket?
  })

  return state
}

// export const useSubscriptionQuery = () => {}
