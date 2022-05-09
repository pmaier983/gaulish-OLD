import React, { createContext, useContext, useReducer } from "react"

export const ERROR_ACTIONS = {
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
}

interface ErrorProviderState {
  ERROR_ACTIONS: typeof ERROR_ACTIONS
  error: React.FC | null
  clearError: () => void
}

interface Action {
  type: string
  // TODO: Specify state of payload
  payload?: any
}

const initialState: ErrorProviderState = {
  ERROR_ACTIONS,
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearError: () => {},
}

interface ContextProps extends ErrorProviderState {
  dispatchErrorAction: React.Dispatch<Action>
}

export const ErrorContext = createContext<ContextProps>({
  ...initialState,
  dispatchErrorAction: () =>
    console.error("Place a Provider In A Parent Node to get Error Context"),
})

export const useErrorContext = () => useContext(ErrorContext)

const reducer = (
  state: ErrorProviderState,
  action: Action
): ErrorProviderState => {
  switch (action.type) {
    case ERROR_ACTIONS.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case ERROR_ACTIONS.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      }
    }
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

// TODO: properly type this.
export const ErrorProvider: React.FC = ({ children }) => {
  // TODO: test, does passing the value as an object vs. an array effect re-renders?
  const [state, dispatchErrorAction] = useReducer(reducer, initialState)

  const clearError = () => {
    dispatchErrorAction({ type: ERROR_ACTIONS.CLEAR_ERROR })
  }

  return (
    <ErrorContext.Provider
      value={{ ...state, dispatchErrorAction, clearError, ERROR_ACTIONS }}
    >
      {children}
    </ErrorContext.Provider>
  )
}
