import React from "react"
import styled from "styled-components"

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

export const LoginPage = () => {
  return <StyledWrapper>Login</StyledWrapper>
}
