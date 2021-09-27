import { useState } from "react"
import styled from "styled-components"

import { MixedCheckbox } from "@reach/checkbox"
import { toggleWebsocketsEnabled } from "@/utils/helperFunctions"
import { LOCAL_STORAGE_KEYS } from "@/utils/enums"
import { ChatBox } from "@/components/ChatBox"
import { useUserContext } from "@/context/UserProvider"

const StyledWrapper = styled.div`
  height: 100%;
`

export const HomePage = () => {
  const { logoutUser } = useUserContext()
  const [checked, setChecked] = useState(
    !!window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_WEBSOCKET_ENABLED)
  )

  return (
    <StyledWrapper>
      Enable Chat
      <MixedCheckbox
        checked={checked}
        onChange={({ target: { checked } }) => {
          setChecked(checked)
          toggleWebsocketsEnabled(checked)
        }}
      />
      {checked && <ChatBox />}
      <button onClick={logoutUser}>Logout</button>
    </StyledWrapper>
  )
}
