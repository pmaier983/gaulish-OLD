import React from "react"
import styled from "styled-components"

import { AppWrapper } from "./AppWrapper"

const StyledWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

const App = () => {
  return <StyledWrapper>Login</StyledWrapper>
}

const WrappedApp: React.FC = () => {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  )
}

export { WrappedApp as App }
