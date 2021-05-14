/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
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
  return (
    <StyledWrapper>
      <a
        target="_blank"
        role="button"
        onClick={() => {
          window.open(process.env.SNOWPACK_PUBLIC_API_URL, "_self")
        }}
        rel="noreferrer"
      >
        Login
      </a>
    </StyledWrapper>
  )
}
