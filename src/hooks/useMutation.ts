import { useQuery, UseQueryOptions, QueryObserverResult } from "react-query"

import { client } from "@/client"
import type { Query, Mutation } from "@/generated/graphql"

// TODO: is there some built in variables type for gql somewhere?
interface Variables {
  [fieldName: string]: string | boolean | number | Variables
}

interface UseCustomMutation<Result> {
  key: keyof Omit<Mutation, "__typename">
  query: string
  variables?: Variables
  queryOptions?: UseQueryOptions<Result>
  requestHeaders?: HeadersInit
}

const baseMutationOptions = {
  enabled: false,
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
}

const useCustomMutation = <Result = Query>({
  key,
  query,
  variables,
  queryOptions,
  requestHeaders,
}: UseCustomMutation<Result>): QueryObserverResult<Result> => {
  return useQuery<Result>(
    key,
    async () => await client.request(query, variables, requestHeaders),
    { ...baseMutationOptions, ...queryOptions }
  )
}

export { useCustomMutation as useMutation }
