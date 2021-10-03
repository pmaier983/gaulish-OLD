import styled from "styled-components"

import { useGridContext } from "@/context/GridProvider"

const StyledWrapper = styled.div`
  grid-area: sidebarRight;
`

export const SidebarRight = () => {
  const { dispatchGridAction, GRID_ACTIONS } = useGridContext()

  return (
    <StyledWrapper>
      <button
        onClick={() =>
          dispatchGridAction({ type: GRID_ACTIONS.INCREASE_CELL_SIZE })
        }
      >
        Increase Cell Size
      </button>
      <button
        onClick={() =>
          dispatchGridAction({ type: GRID_ACTIONS.DECREASE_CELL_SIZE })
        }
      >
        Decrease Cell Size
      </button>
    </StyledWrapper>
  )
}
