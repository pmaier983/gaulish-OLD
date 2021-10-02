import type React from "react"

import { AppWrapper } from "@/AppWrapper"
import { LoginPage } from "@/pages/LoginPage"
import { HomePage } from "@/pages/HomePage"
import { useUserContext } from "@/context/UserProvider"

// TODO: setup 404 page
// TODO: bump to husky 7.X
const App = () => {
  const { isLoggedIn } = useUserContext()

  if (!isLoggedIn) {
    return <LoginPage />
  }

  return <HomePage />
}

const WrappedApp: React.FC = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
)

export { WrappedApp as App }
