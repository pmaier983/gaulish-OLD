import React, { createContext, useContext, useEffect, useState } from "react"

import io, { Socket } from "socket.io-client"
import { clearToken, getToken } from "./UserProvider"

type SocketWrapper = Socket

interface SocketProviderState {
  socket: SocketWrapper
}

const initialState: SocketProviderState = {
  // TODO: is there a better way to type this?
  socket: {} as Socket,
}

export const SocketContext = createContext({
  ...initialState,
})

export const useSocketContext = () => useContext(SocketContext)

const socket = io(process.env.SNOWPACK_PUBLIC_API_URL_DOMAIN, {
  extraHeaders: {
    authorization: `Bearer ${getToken()}`,
  },
})

export const SocketProvider: React.FC = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection!")
    })
    socket.on("disconnect", () => {
      console.log("disconnect")
    })
    socket.on("connect_error", (e) => {
      console.log("connect_error", e)
      clearToken()
    })
    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  })

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
