import React from "react"

// TODO is there a better way to type this (if you need children?)
const AppWrapper: React.FC = ({ children }) => {
  return <>{children}</>
}

export { AppWrapper }
