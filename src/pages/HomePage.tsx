import { useState } from "react"
import styled from "styled-components"

import { MixedCheckbox } from "@reach/checkbox"
import { toggleWebsocketsEnabled } from "@/utils/helperFunctions"
import { LOCAL_STORAGE_KEYS } from "@/utils/enums"
import { ChatBox } from "@/components/ChatBox"
import { useUserContext } from "@/context/UserProvider"
import { Grid } from "@/components/Grid"

const StyledWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(100px, 1fr) minmax(10px, 2fr) minmax(100px, 1fr);
  grid-template-rows: minmax(100px, 1fr) minmax(10px, 2fr) minmax(10px, 1fr);
`

export const HomePage = () => {
  const { logoutUser } = useUserContext()
  const [checked, setChecked] = useState(
    !!window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)
  )

  return (
    <StyledWrapper>
      {/* Enable Chat
      <MixedCheckbox
        checked={checked}
        onChange={({ target: { checked } }) => {
          setChecked(checked)
          toggleWebsocketsEnabled(checked)
        }}
      />
      {checked && <ChatBox />}
      <button onClick={logoutUser}>Logout</button> */}
      {/* <Grid /> */}

      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </StyledWrapper>
  )
}
