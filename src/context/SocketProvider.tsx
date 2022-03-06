import React, { createContext, useContext, useEffect, useState } from "react"

import io, { Socket } from "socket.io-client"
import { getToken } from "./UserProvider"

type SocketWrapper = Socket

interface SocketProviderState {
  socket?: SocketWrapper
}

const initialState: SocketProviderState = {
  socket: undefined,
}

export const SocketContext = createContext({
  ...initialState,
})

export const useSocketContext = () => useContext(SocketContext)

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketWrapper>()

  useEffect(() => {
    const newSocket = io(process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN, {
      extraHeaders: {
        authorization: `Bearer ${getToken()}`,
      },
    })
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [setSocket])

  // TODO: handle loading state
  if (!socket) return <div>Loading...</div>

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
