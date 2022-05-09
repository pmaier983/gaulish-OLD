import styled, { css } from "styled-components"

import { useErrorContext } from "@/context/ErrorProvider"
import { useEffect } from "react"

const StyledWrapper = styled.div`
  text-align: center;
  height: min-height;
  font-weight: bold;
  ${({ theme: { colors } }) => {
    return css`
      color: ${colors.red};
    `
  }}
`

export const Error = () => {
  const { error, clearError } = useErrorContext()

  // Clear the error after 10s
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearError()
    }, 10000)
    return () => clearTimeout(timeoutId)
  }, [clearError])

  return <StyledWrapper>{error}</StyledWrapper>
}
