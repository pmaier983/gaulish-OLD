import { useQuery, UseQueryOptions, QueryObserverResult } from "react-query"

import { client } from "@/client"
import type { Query } from "@/generated/graphql"

// TODO: is there some built in variables type for gql somewhere?
// TODO: move centrally?
export interface Variables {
  [fieldName: string]: string | boolean | number | Variables
}

interface UseCustomQuery<Result> {
  key: keyof Omit<Query, "__typename"> | "getMap"
  query: string
  variables?: Variables
  queryOptions?: UseQueryOptions<Result>
  requestHeaders?: HeadersInit
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
