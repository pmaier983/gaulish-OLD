import type React from "react"

import { QueryProvider } from "@/context/QueryProvider"
import { ThemeWrapper } from "@/context/ThemeProvider"
import { UserProvider } from "@/context/UserProvider"
import { GlobalStyle } from "@/utils/globalStyles"

// TODO is there a better way to type this (if you need children?)
// TODO figure out React.PropsWithChildren
const AppWrapper: React.FC = ({ children }) => {
  // TODO: how to open up a websocket without an actual query?
  // this empty subscription will open the websocket connection and keep it open
  // until the connection is closed
  // useSubscription({ query: gql`` })
  return (
    <QueryProvider>
      <UserProvider>
        <ThemeWrapper>
          <GlobalStyle />
          {children}
        </ThemeWrapper>
      </UserProvider>
    </QueryProvider>
  )
}

export { AppWrapper }
