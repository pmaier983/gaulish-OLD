import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"
import { useMapContext } from "@/context/MapProvider"
import { useErrorContext } from "@/context/ErrorProvider"
import { useShipContext } from "@/context/ShipProvider"
import { Error } from "@/components/Error"

const StyledWrapper = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
`

const UpperButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const LowerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`

export const Header = () => {
  const { dispatchMapAction, MAP_ACTIONS, isPaused } = useMapContext()
  const { clearError } = useErrorContext()
  const { dispatchShipAction, SHIP_ACTIONS, selectedShip } = useShipContext()
  const { logoutUser } = useUserContext()

  return (
    <StyledWrapper>
      <UpperButtonContainer>
        <div>
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
          <button
            onClick={() =>
              dispatchMapAction({ type: MAP_ACTIONS.TOGGLE_MAP_PAUSE })
            }
          >
            {isPaused ? "Un-Pause" : "Pause"}
          </button>
        </div>
        <button onClick={logoutUser}>Logout</button>
      </UpperButtonContainer>
      {selectedShip && (
        <LowerButtonContainer>
          <button onClick={() => console.log("Wahooooo TODO")}>Set Sail</button>
          <button
            onClick={() => {
              dispatchShipAction({ type: SHIP_ACTIONS.UN_SELECT_SHIP })
              clearError()
            }}
          >
            Cancel
          </button>
        </LowerButtonContainer>
      )}
      <Error />
    </StyledWrapper>
  )
}
