import React, { createContext, useContext, useReducer } from "react"

import type { Ship, Tile } from "@/generated/graphql"
import { useQuery } from "@/hooks/useQuery"
import { gql } from "graphql-request"
import { useUserContext } from "./UserProvider"

export const SHIP_ACTIONS = {
  SET_SHIPS: "SET_SHIPS",

  TOGGLE_SELECT_SHIP: "TOGGLE_SELECT_SHIP",
  UN_SELECT_SHIP: "UN_SELECT_SHIP",

  ADD_TILE_SHIP_PATH: "ADD_TILE_SHIP_PATH",
  REMOVE_TILE_SHIP_PATH: "REMOVE_TILE_SHIP_PATH",
  TOGGLE_TILE_SHIP_PATH: "TOGGLE_TILE_SHIP_PATH",
}

interface ShipProviderState {
  SHIP_ACTIONS: typeof SHIP_ACTIONS
  shipPath: Tile[]
  selectedShip?: Ship
  ships: Ship[]
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: ShipProviderState = {
  shipPath: [],
  ships: [],
  SHIP_ACTIONS,
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

const reducer = (
  state: ShipProviderState,
  action: Action
): ShipProviderState => {
  switch (action.type) {
    case SHIP_ACTIONS.TOGGLE_SELECT_SHIP: {
      const newSelectedShipId = action.payload

      // if the ship is already the selected ship, remove it
      if (newSelectedShipId === state.selectedShip?.ship_id) {
        return {
          ...state,
          selectedShip: undefined,
          shipPath: [],
        }
      }

      const { ships } = state

      for (let i = 0; i < ships.length; i++) {
        const curShip = ships[i]
        if (curShip.ship_id === newSelectedShipId) {
          return {
            ...state,
            selectedShip: curShip,
            shipPath: [curShip.city.tile],
          }
        }
      }

      // if the ship_id is not in the ships list, ignore it
      return state
    }
    case SHIP_ACTIONS.UN_SELECT_SHIP: {
      return {
        ...state,
        selectedShip: undefined,
        shipPath: [],
      }
    }
    case SHIP_ACTIONS.SET_SHIPS: {
      return {
        ...state,
        ships: action.payload,
      }
    }
    case SHIP_ACTIONS.ADD_TILE_SHIP_PATH: {
      return {
        ...state,
        shipPath: [...state.shipPath, action.payload],
      }
    }
    case SHIP_ACTIONS.REMOVE_TILE_SHIP_PATH: {
      const shipPathLessLastTile = state.shipPath.slice(0, -1)
      if (shipPathLessLastTile.length === 0) {
        return {
          ...state,
          shipPath: [],
          selectedShip: undefined,
        }
      }
      return {
        ...state,
        shipPath: shipPathLessLastTile,
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
          ship_type {
            id
            ship_type_id
            name
            cargo_capacity
            inventory_slots
            speed
          }
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
      value={{ ...state, dispatchShipAction, SHIP_ACTIONS }}
    >
      {children}
    </ShipContext.Provider>
  )
}
