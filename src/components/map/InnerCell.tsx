import styled from "styled-components"

const StyledInnerCell = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
`

const StyledHeader = styled.div``

const StyledMain = styled.div`
  text-align: center;
`

const StyledFooter = styled.div``

interface InnerCellProps {
  topLeftText?: string
  centerText?: string
  bottomText?: string
}

export const InnerCell = ({
  topLeftText,
  centerText,
  bottomText,
}: InnerCellProps) => {
  // dont waste time rendering div's if not needed.
  if (!topLeftText && !centerText && !bottomText) return null

  return (
    <StyledInnerCell>
      <StyledHeader>{topLeftText}</StyledHeader>
      <StyledMain>{centerText}</StyledMain>
      <StyledFooter>{bottomText}</StyledFooter>
    </StyledInnerCell>
  )
}
