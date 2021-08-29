import styled from "styled-components"

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.color.gray[300]}; // TODO: have waves and water
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 500px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid black;
`

const StyledButton = styled.button`
  padding: 10px;
`

export const LoginPage = () => (
  <StyledPageWrapper>
    <StyledButtonWrapper>
      <StyledButton
        onClick={() => {
          window.open(
            `${process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN}/google`,
            "_self"
          )
        }}
      >
        Login
      </StyledButton>
    </StyledButtonWrapper>
  </StyledPageWrapper>
)
