import { MixedCheckbox } from "@reach/checkbox"
import { useState } from "react"
import styled from "styled-components"

import { LOCAL_STORAGE_KEYS } from "@/utils/constants"
import { toggleWebsocketsEnabled } from "@/utils/helperFunctions"
import { ChatBox } from "@/components"

const StyledWrapper = styled.div`
  grid-area: footer;
`

export const Footer = () => {
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
    </StyledWrapper>
  )
}
