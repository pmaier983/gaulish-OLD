import type React from "react"
import styled from "styled-components"

import { AppWrapper } from "@/AppWrapper"
import { LoginPage } from "@/pages/LoginPage"
import { useUserContext } from "@/context/UserProvider"
import { useSubscription } from "@/hooks/useSubscription"
import { gql } from "graphql-request"

const StyledWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

// TODO: setup 404 page
// handle Shared server <-> client types
// TODO remove lodash from the app
const App = () => {
  const { isLoggedIn, user, logoutUser } = useUserContext()

  const data = useSubscription({
    query: gql`
      subscription {
        globalChat {
          text
          username
        }
      }
    `,
  })

  return (
    <div>
      Hello
      {JSON.stringify(data)}
    </div>
  )
  if (!isLoggedIn) {
    return <LoginPage />
  }

  return (
    <StyledWrapper>
      <h1>Hello</h1>
      <div>{JSON.stringify(user)}</div>
      <button onClick={logoutUser}>Logout</button>
    </StyledWrapper>
  )
}

const WrappedApp: React.FC = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
)

export { WrappedApp as App }
