import styled from "styled-components"

const StyledInnerCell = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
  text-align: center;
`

const StyledHeader = styled.div`
  text-align: start;
`

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
`

const StyledFooter = styled.div``

interface InnerCellProps {
  topLeftText?: React.ReactChild
  centerText?: React.ReactChild
  bottomText?: React.ReactChild
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
