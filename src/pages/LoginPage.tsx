import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

export const LoginPage = () => {
  const { isLoggedIn, user, logoutUser } = useUserContext()
  if (isLoggedIn) {
    return (
      <>
        <h1>Hello</h1>
        <div>{JSON.stringify(user)}</div>
        <button onClick={logoutUser}>Logout</button>
      </>
    )
  }
  return (
    <StyledWrapper>
      <button
        onClick={() => {
          window.open(
            `${process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN}/google`,
            "_self"
          )
        }}
      >
        Login
      </button>
    </StyledWrapper>
  )
}
