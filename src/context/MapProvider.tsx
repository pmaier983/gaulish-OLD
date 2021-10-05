import React, { createContext, useContext, useReducer } from "react"

import {
  CELL_SIZE_INCREMENT,
  DEFAULT_CELL_SIZE,
  LOCAL_STORAGE_KEYS,
  MAX_CELL_SIZE,
  MIN_CELL_SIZE,
} from "@/utils/constants"

export const MAP_ACTIONS = {
  INCREASE_CELL_SIZE: "INCREASE_CELL_SIZE",
  DECREASE_CELL_SIZE: "DECREASE_CELL_SIZE",
}

interface MapProviderState {
  cellSize: number
  MAP_ACTIONS: typeof MAP_ACTIONS
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: MapProviderState = {
  // TODO: is this IIFE bad?
  cellSize: (() => {
    const storedCellSize = window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.CELL_SIZE
    )
    if (storedCellSize) return parseInt(storedCellSize, 10)
    return DEFAULT_CELL_SIZE
  })(),
  MAP_ACTIONS,
}

interface ContextProps extends MapProviderState {
  dispatchMapAction: React.Dispatch<Action>
}

export const MapContext = createContext<ContextProps>({
  ...initialState,
  dispatchMapAction: () =>
    console.error(
      "Place a Provider In A Parent Node to get Landing Page Context"
    ),
})

export const useMapContext = () => useContext(MapContext)

const reducer = (state: MapProviderState, action: Action) => {
  switch (action.type) {
    case MAP_ACTIONS.INCREASE_CELL_SIZE: {
      const newCellSize = Math.min(
        MAX_CELL_SIZE,
        state.cellSize + CELL_SIZE_INCREMENT
      )
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.CELL_SIZE,
        newCellSize.toString()
      )
      return {
        ...state,
        cellSize: newCellSize,
      }
    }
    case MAP_ACTIONS.DECREASE_CELL_SIZE: {
      const newCellSize = Math.max(
        MIN_CELL_SIZE,
        state.cellSize - CELL_SIZE_INCREMENT
      )
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.CELL_SIZE,
        newCellSize.toString()
      )
      return {
        ...state,
        cellSize: newCellSize,
      }
    }
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

// TODO: properly type this.
export const MapProvider: React.FC = ({ children }) => {
  // TODO: test, does passing the value as an object vs. an array effect re-renders?
  const [state, dispatchMapAction] = useReducer(reducer, initialState)
  return (
    <MapContext.Provider value={{ ...state, dispatchMapAction, MAP_ACTIONS }}>
      {children}
    </MapContext.Provider>
  )
}
