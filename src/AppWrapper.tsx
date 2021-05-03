import React from "react"

import { QueryProvider } from "./context"

// TODO is there a better way to type this (if you need children?)
const AppWrapper: React.FC = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>
}

export { AppWrapper }
