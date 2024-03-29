import styled, { css } from "styled-components"
import { MixedCheckbox } from "@reach/checkbox"

import { useShipContext } from "@/context/ShipProvider"

const StyledWrapper = styled.div`
  display: flex;
  background-color: lightgrey;
  flex: 1;
  padding: 10px;
`

export const Ships = () => {
  const { dispatchShipAction, SHIP_ACTIONS, selectedShipId, ships } =
    useShipContext()

  if (!ships?.length) {
    return (
      <StyledWrapper
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        No Ships
      </StyledWrapper>
    )
  }

  // TODO: use react-table
  return (
    <StyledWrapper>
      {ships.map((ship) => {
        const currentShipId = ship?.ship_id
        return (
          <div key={currentShipId}>
            <MixedCheckbox
              value="ShipName"
              checked={selectedShipId === currentShipId}
              onChange={() => {
                dispatchShipAction({
                  type: SHIP_ACTIONS.TOGGLE_SELECT_SHIP,
                  payload: currentShipId,
                })
              }}
            />
            {ship?.name}
          </div>
        )
      })}
    </StyledWrapper>
  )
}
