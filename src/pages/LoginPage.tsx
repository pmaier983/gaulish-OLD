import styled from "styled-components"

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

export const LoginPage = () => (
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
