import { gql } from "graphql-request"
import styled from "styled-components"

import { useSubscription } from "@/hooks/useSubscription"

const StyledWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray[300]};
`

export const HomePage = () => {
  const data = useSubscription<"globalChat">({
    query: gql`
      subscription {
        globalChat {
          text
          username
        }
      }
    `,
  })

  return (
    <StyledWrapper>
      Hello
      {JSON.stringify(data)}
    </StyledWrapper>
  )
}
