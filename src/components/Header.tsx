import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"

const StyledWrapper = styled.div`
  grid-area: header;
`

export const Header = () => {
  const { logoutUser } = useUserContext()
  return (
    <StyledWrapper>
      <button onClick={logoutUser}>Logout</button>
    </StyledWrapper>
  )
}
