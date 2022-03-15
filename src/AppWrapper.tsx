import type React from "react"

import { QueryProvider } from "@/context/QueryProvider"
import { ThemeWrapper } from "@/context/ThemeProvider"
import { UserProvider } from "@/context/UserProvider"
import { GlobalStyle } from "@/utils/globalStyles"
import { MapProvider } from "@/context/MapProvider"
import { ShipProvider } from "@/context/ShipProvider"
import { SocketProvider } from "@/context/SocketProvider"

// TODO: setup internationalization
// TODO: is there a better way to type this (if you need children?)
// TODO: figure out React.PropsWithChildren
const AppWrapper: React.FC = ({ children }) => {
  return (
    <ThemeWrapper>
      <QueryProvider>
        <UserProvider>
          <SocketProvider>
            <ShipProvider>
              <MapProvider>
                <GlobalStyle />
                {children}
              </MapProvider>
            </ShipProvider>
          </SocketProvider>
        </UserProvider>
      </QueryProvider>
    </ThemeWrapper>
  )
}

export { AppWrapper }
