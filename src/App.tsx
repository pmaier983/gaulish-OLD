import React from "react"
import { useQuery } from "react-query"
import { request, gql } from "graphql-request"

import { AppWrapper } from "./AppWrapper"

const App = () => {
  const a = useQuery("tiles", async () => {
    return await request(
      "http://localhost:8080/graphql",
      gql`
        query {
          getAllTiles {
            id
            tile_id
            x
            y
          }
        }
      `
    )
  })

  return <div>{JSON.stringify(a)}</div>
}

const WrappedApp: React.FC = () => {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  )
}

export { WrappedApp as App }
