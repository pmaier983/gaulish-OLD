import type React from "react"

import { AppWrapper } from "@/AppWrapper"
import { HomePage } from "@/pages/HomePage"

// TODO: setup 404 page
// TODO: bump to husky 7.X
const App = () => {
  return <HomePage />
}

const WrappedApp: React.FC = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
)

export { WrappedApp as App }
