import { useQuery, UseQueryOptions, QueryObserverResult } from "react-query"

import { client } from "@/client"
import type { GRAPHQL_QUERY_KEYS } from "@/utils/enums"
import type { Query } from "@/generated/graphql"

// TODO: is there some built in variables type for gql somewhere?
interface Variables {
  [fieldName: string]: string | boolean | number | Variables
}

interface UseCustomQuery<Result> {
  key: keyof typeof GRAPHQL_QUERY_KEYS
  query: string
  variables?: Variables
  queryOptions?: UseQueryOptions<Result>
  requestHeaders?: Headers
}

const useCustomQuery = <Result = Query>({
  key,
  query,
  variables,
  queryOptions,
  requestHeaders,
}: UseCustomQuery<Result>): QueryObserverResult<Result> => {
  return useQuery<Result>(
    key,
    async () => await client.request(query, variables, requestHeaders),
    queryOptions
  )
}

export { useCustomQuery as useQuery }
