import styled from "styled-components"

import { Header, Footer, SidebarLeft, SidebarRight, Map } from "@/components"

const StyledWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 100px 1fr 200px;
  grid-template-areas:
    "header header header"
    "sidebarLeft map sidebarRight"
    "footer footer footer";
`

export const HomePage = () => {
  return (
    <StyledWrapper>
      <Header />
      <SidebarLeft />
      <Map />
      <SidebarRight />
      <Footer />
    </StyledWrapper>
  )
}
