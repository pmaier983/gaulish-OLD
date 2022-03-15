import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"
import { useMapContext } from "@/context/MapProvider"

const StyledWrapper = styled.div`
  grid-area: header;
`

export const Header = () => {
  const { dispatchMapAction, MAP_ACTIONS } = useMapContext()
  const { logoutUser } = useUserContext()

  return (
    <StyledWrapper>
      <button
        onClick={() =>
          dispatchMapAction({ type: MAP_ACTIONS.INCREASE_CELL_SIZE })
        }
      >
        Increase Cell Size
      </button>
      <button
        onClick={() =>
          dispatchMapAction({ type: MAP_ACTIONS.DECREASE_CELL_SIZE })
        }
      >
        Decrease Cell Size
      </button>
      <button onClick={logoutUser}>Logout</button>
    </StyledWrapper>
  )
}
