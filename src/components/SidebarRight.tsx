import styled from "styled-components"

import { useMapContext } from "@/context/MapProvider"

const StyledWrapper = styled.div`
  grid-area: sidebarRight;
`

export const SidebarRight = () => {
  const { dispatchMapAction, MAP_ACTIONS } = useMapContext()

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
    </StyledWrapper>
  )
}
