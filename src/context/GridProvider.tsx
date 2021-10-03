import React, { createContext, useContext, useReducer } from "react"

import {
  CELL_SIZE_INCREMENT,
  MAX_CELL_SIZE,
  MIN_CELL_SIZE,
} from "@/utils/constants"

export const GRID_ACTIONS = {
  INCREASE_CELL_SIZE: "INCREASE_CELL_SIZE",
  DECREASE_CELL_SIZE: "DECREASE_CELL_SIZE",
}

interface GridProviderState {
  cellSize: number
  GRID_ACTIONS: typeof GRID_ACTIONS
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: GridProviderState = {
  cellSize: 70,
  GRID_ACTIONS,
}

interface ContextProps extends GridProviderState {
  dispatchGridAction: React.Dispatch<Action>
}

export const GridContext = createContext<ContextProps>({
  ...initialState,
  dispatchGridAction: () =>
    console.error(
      "Place a Provider In A Parent Node to get Landing Page Context"
    ),
})

export const useGridContext = () => useContext(GridContext)

const reducer = (state: GridProviderState, action: Action) => {
  switch (action.type) {
    case GRID_ACTIONS.INCREASE_CELL_SIZE:
      return {
        ...state,
        cellSize: Math.min(MAX_CELL_SIZE, state.cellSize + CELL_SIZE_INCREMENT),
      }
    case GRID_ACTIONS.DECREASE_CELL_SIZE:
      return {
        ...state,
        cellSize: Math.max(MIN_CELL_SIZE, state.cellSize - CELL_SIZE_INCREMENT),
      }
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

// TODO: properly type this.
export const GridProvider: React.FC = ({ children }) => {
  // TODO: test, does passing the value as an object vs. an array effect re-renders?
  const [state, dispatchGridAction] = useReducer(reducer, initialState)
  return (
    <GridContext.Provider
      value={{ ...state, dispatchGridAction, GRID_ACTIONS }}
    >
      {children}
    </GridContext.Provider>
  )
}
