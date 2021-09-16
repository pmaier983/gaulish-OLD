import styled from "styled-components"

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // TODO: have waves and water
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 500px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.color.primary};
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
