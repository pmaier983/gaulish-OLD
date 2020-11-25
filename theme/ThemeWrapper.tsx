import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme"

const ThemeWrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export { ThemeWrapper }
