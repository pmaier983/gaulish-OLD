import React, { createContext, useContext, useReducer } from "react"

import type { Ship } from "@/generated/graphql"
import { useQuery } from "@/hooks/useQuery"
import { gql } from "graphql-request"
import { useUserContext } from "./UserProvider"

export const SHIP_ACTIONS = {
  TOGGLE_SELECT_SHIP: "TOGGLE_SELECT_SHIP",
  SET_SHIPS: "SET_SHIPS",
}

interface ShipProviderState {
  SHIP_ACTIONS: typeof SHIP_ACTIONS
  selectedShipId?: number
  ships: Ship[]
  getSelectedShip: () => Ship | void
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: ShipProviderState = {
  selectedShipId: undefined,
  ships: [],
  SHIP_ACTIONS,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getSelectedShip: () => {},
}

interface ContextProps extends ShipProviderState {
  dispatchShipAction: React.Dispatch<Action>
}

export const ShipContext = createContext<ContextProps>({
  ...initialState,
  dispatchShipAction: () =>
    console.error(
      "Place a Provider In A Parent Node to get Landing Page Context"
    ),
})

export const useShipContext = () => useContext(ShipContext)

const reducer = (state: ShipProviderState, action: Action) => {
  switch (action.type) {
    case SHIP_ACTIONS.TOGGLE_SELECT_SHIP: {
      const newSelectedShipId = action.payload
      // if the ship is already the selected ship, remove it
      if (newSelectedShipId === state.selectedShipId) {
        return {
          ...state,
          selectedShipId: undefined,
        }
      }

      const { ships } = state

      for (let i = 0; i < ships.length; i++) {
        const curShip = ships[i]
        if (curShip.ship_id === newSelectedShipId) {
          return {
            ...state,
            selectedShipId: newSelectedShipId,
          }
        }
      }

      // if the ship_id is not in the ships list, ignore it
      return state
    }
    case SHIP_ACTIONS.SET_SHIPS: {
      // TODO: some data sifting here?
      return {
        ...state,
        ships: action.payload,
      }
    }
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

// TODO: properly type this.
export const ShipProvider: React.FC = ({ children }) => {
  const { user } = useUserContext()
  // TODO: test, does passing the value as an object vs. an array effect re-renders?
  const [state, dispatchShipAction] = useReducer(reducer, initialState)

  // TODO: wrap in a memo?
  const getSelectedShip = (): Ship | void => {
    if (!state.selectedShipId) {
      return
    }
    const { ships } = state
    for (let i = 0; i < ships.length; i++) {
      const curShip = ships[i]
      if (curShip.ship_id === state.selectedShipId) {
        return curShip
      }
    }
    dispatchShipAction({
      type: SHIP_ACTIONS.TOGGLE_SELECT_SHIP,
      payload: state.selectedShipId,
    })
    return
  }

  // TODO: is there a better way to do this?
  const { isLoading } = useQuery({
    key: "getShipsByUUID",
    query: gql`
      {
        getShipsByUUID(uuid: ${user?.uuid}) {
          id
          ship_id
          name
          uuid
          ship_type_id
          city {
            id
            city_id
            name
            tile {
              id
              tile_id
              x
              y
              type
            }
          }
        }
      }
    `,
    queryOptions: {
      onSuccess: (res) => {
        dispatchShipAction({
          type: SHIP_ACTIONS.SET_SHIPS,
          payload: res.getShipsByUUID,
        })
      },
    },
  })

  if (isLoading) {
    return <div>Loading Ships...</div>
  }

  return (
    <ShipContext.Provider
      value={{ ...state, dispatchShipAction, SHIP_ACTIONS, getSelectedShip }}
    >
      {children}
    </ShipContext.Provider>
  )
}
