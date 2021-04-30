import React from "react"
import { AppWrapper } from "./AppWrapper"

const UnwrappedApp = () => {
  return <div />
}

const App: React.FC = () => (
  <AppWrapper>
    <UnwrappedApp />
  </AppWrapper>
)

export { App }
