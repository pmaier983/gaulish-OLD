import { GraphQLClient } from "graphql-request"

export const client = new GraphQLClient(
  `${process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN}/graphql`
)
