import styled, { css } from "styled-components"

const StyledInnerCell = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
`

interface StyledTextProps {
  isText: boolean
}

const StyledText = styled.div<StyledTextProps>`
  ${({ isText }) => {
    if (isText) {
      return css`
        background-color: white;
        border-radius: 10px;
        padding: 0 5px;
        height: min-content;
      `
    }
  }}
`

const StyledHeader = styled(StyledText)`
  justify-self: start;
`

const StyledMain = styled(StyledText)`
  justify-self: center;
`

const StyledFooter = styled(StyledText)`
  justify-self: center;
`

interface InnerCellProps {
  header?: React.ReactChild
  main?: React.ReactChild
  footer?: React.ReactChild
}

export const InnerCell = ({ header, main, footer }: InnerCellProps) => {
  // dont waste time rendering div's if not needed.
  if (!header && !main && !footer) return null

  return (
    <StyledInnerCell>
      <StyledHeader isText={typeof header === "string"}>{header}</StyledHeader>
      <StyledMain isText={typeof main === "string"}>{main}</StyledMain>
      <StyledFooter isText={typeof footer === "string"}>{footer}</StyledFooter>
    </StyledInnerCell>
  )
}
