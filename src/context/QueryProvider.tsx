import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import { fetchWithBaseURL } from "../utils/customFetch"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetchWithBaseURL,
      refetchOnWindowFocus: false,
    },
  },
})

const QueryProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export { QueryProvider }
