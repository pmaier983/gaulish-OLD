import { GraphQLClient } from "graphql-request"
import { createClient } from "graphql-ws"

export const client = new GraphQLClient(
  `${process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN}/graphql`
)

export const websocketClient = createClient({
  url: `ws://localhost:8080/graphql`,
})
