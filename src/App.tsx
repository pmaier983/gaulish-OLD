import type React from "react"
import styled from "styled-components"

import { AppWrapper } from "@/AppWrapper"
import { LoginPage } from "@/pages/LoginPage"

const StyledWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

// TODO: setup 404 page
// handle Shared server <-> client types
// TODO remove lodash from the app
const App = () => {
  // TODO: fetch from local storage
  const isLoggedIn = false
  if (!isLoggedIn) {
    return <LoginPage />
  }
  return <StyledWrapper>Login</StyledWrapper>
}

const WrappedApp: React.FC = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
)

export { WrappedApp as App }
