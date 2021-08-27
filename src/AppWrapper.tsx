import type React from "react"

import { QueryProvider } from "@/context/QueryProvider"
import { ThemeWrapper } from "@/context/ThemeProvider"
import { UserProvider } from "@/context/UserProvider"
import { GlobalStyle } from "@/utils/globalStyles"

import "./fonts/globalFonts.css" // TODO: is there a styled-components way to do this?

// TODO is there a better way to type this (if you need children?)
// TODO figure out React.PropsWithChildren
const AppWrapper: React.FC = ({ children }) => {
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
