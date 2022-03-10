import { createContext, useContext, useEffect, useState } from "react"
import { gql } from "graphql-request"

import { LOCAL_STORAGE_KEYS } from "@/utils/constants"
import { useQuery } from "@/hooks/useQuery"
import { client } from "@/client"
import type { User } from "@/generated/graphql"
import { LoginPage } from "@/pages/LoginPage"

interface UserContextState {
  // TODO: how to fix this user null state?
  user?: User
  isLoggedIn: boolean
  isLoading: boolean
  setUser: (user: User) => void
  logoutUser: () => void
}

export const UserContext = createContext({
  user: undefined,
  isLoggedIn: false,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_user: User) => {
    console.error("Place a Provider In A Parent Node to get a Theme")
  },
  logoutUser: () => {
    console.error("Place a Provider In A Parent Node to get a Theme")
  },
})

export const useUserContext = (): UserContextState => useContext(UserContext)

// TODO: atob -> Buffer (possibly need polyfill?)
// TODO: clean this up into separate functions
const getUser = (token?: string) => {
  // if passed a token parse the token
  if (token) {
    const [, tokenData] = token.split(".")
    if (tokenData) {
      return JSON.parse(atob(tokenData))
    }
  }
  const possibleToken = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
  if (!possibleToken) return
  const [, tokenData] = possibleToken.split(".")
  if (tokenData) {
    return JSON.parse(atob(tokenData))
  }
  return
}

// TODO: do something about repeat use of getToken?
export const getToken = (): string | null => {
  const localStorageToken = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.TOKEN
  )
  if (localStorageToken) {
    return localStorageToken
  }
  const queryObject = new URLSearchParams(location.search)
  const urlTokenKey = LOCAL_STORAGE_KEYS.TOKEN.toLowerCase()
  if (queryObject.has(urlTokenKey)) {
    return queryObject.get(urlTokenKey)
  }
  return null
}

export const clearToken = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
}

// TODO: store JWT in http only cookie [if possible] (Also setup Refresh Token Auth)
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO verify token b4 getting user?
  const [isLoggedIn, setLoginStatus] = useState(false)
  const [user, setUser] = useState(getUser())
  const { refetch, isLoading } = useQuery({
    key: "verifyToken",
    query: gql`
      {
        verifyToken
      }
    `,
    queryOptions: {
      enabled: false,
      onSuccess: (res) => {
        if (res.verifyToken) {
          const token = getToken()
          // TODO: set token to header here?
          if (token) {
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
            setUser(getUser(token))
            client.setHeader("authorization", `Bearer ${token}`)
          }
          setLoginStatus(true)
        } else {
          clearToken()
        }
      },
      onError: () => {
        clearToken()
      },
      // Finally scrub the token from the url
      onSettled: () => {
        // TODO: how to do this immediately?
        window.history.replaceState({}, document.title, "/")
      },
    },
    requestHeaders: {
      authorization: `Bearer ${getToken()}`,
    },
  })

  useEffect(() => {
    // If the token is in localStorage or
    if (getToken() && !isLoggedIn) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logoutUser = () => {
    setLoginStatus(false)
    setUser(undefined)
    clearToken()
  }

  // TODO: workout these dang error states... I mean really
  if (isLoading || !isLoggedIn || !user) return <LoginPage />

  return (
    <UserContext.Provider
      value={{ isLoggedIn, isLoading, user, setUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
export { UserProvider }
