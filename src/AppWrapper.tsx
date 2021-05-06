import React from "react"

import { QueryProvider } from "@/context/QueryProvider"
import { ThemeWrapper } from "@/context/ThemeProvider"
import { GlobalStyle } from "@/utils/globalStyles"

// TODO is there a better way to type this (if you need children?)
const AppWrapper: React.FC = ({ children }) => {
  return (
    <ThemeWrapper>
      <GlobalStyle />
      <QueryProvider>{children}</QueryProvider>
    </ThemeWrapper>
  )
}

export { AppWrapper }
