import React, { createContext, useContext, useReducer } from "react"

export const VISIBILITY_QUEUE_ACTIONS = {}

interface VisibilityQueueProviderState {
  VISIBILITY_QUEUE_ACTIONS: typeof VISIBILITY_QUEUE_ACTIONS
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: VisibilityQueueProviderState = {
  VISIBILITY_QUEUE_ACTIONS,
}

interface ContextProps extends VisibilityQueueProviderState {
  dispatchVisibilityQueueAction: React.Dispatch<Action>
}

export const VisibilityQueueContext = createContext<ContextProps>({
  ...initialState,
  dispatchVisibilityQueueAction: () =>
    console.error(
      "Place a Provider In A Parent Node to get Landing Page Context"
    ),
})

export const useVisibilityQueueContext = () =>
  useContext(VisibilityQueueContext)

const reducer = (state: VisibilityQueueProviderState, action: Action) => {
  switch (action.type) {
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

// TODO: properly type this.
export const VisibilityQueueProvider: React.FC = ({ children }) => {
  // TODO: test, does passing the value as an object vs. an array effect re-renders?
  const [state, dispatchVisibilityQueueAction] = useReducer(
    reducer,
    initialState
  )

  return (
    <VisibilityQueueContext.Provider
      value={{
        ...state,
        dispatchVisibilityQueueAction,
        VISIBILITY_QUEUE_ACTIONS,
      }}
    >
      {children}
    </VisibilityQueueContext.Provider>
  )
}
