import styled from "styled-components"

import { useUserContext } from "@/context/UserProvider"
import { useMapContext } from "@/context/MapProvider"
import { useShipContext } from "@/context/ShipProvider"

const StyledWrapper = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UpperButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const LowerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Header = () => {
  const { dispatchMapAction, MAP_ACTIONS } = useMapContext()
  const { dispatchShipAction, SHIP_ACTIONS, selectedShipId } = useShipContext()
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
        </div>
        <button onClick={logoutUser}>Logout</button>
      </UpperButtonContainer>
      {selectedShipId && (
        <LowerButtonContainer>
          <button
            onClick={() =>
              dispatchShipAction({ type: SHIP_ACTIONS.UN_SELECT_SHIP })
            }
          >
            Cancel
          </button>
        </LowerButtonContainer>
      )}
    </StyledWrapper>
  )
}
