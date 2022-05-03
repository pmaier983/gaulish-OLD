import styled, { css } from "styled-components"

import { useShipContext } from "@/context/ShipProvider"

const StyledWrapper = styled.div`
  display: flex;
  background-color: lightgrey;
  flex: 1;
  padding: 10px;
`

export const Ships = () => {
  const { dispatchShipAction, SHIP_ACTIONS, selectedShip, ships } =
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
            <input
              value="ShipName"
              checked={
                selectedShip?.ship_id
                  ? selectedShip?.ship_id === currentShipId
                  : false
              }
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
