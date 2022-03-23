import { useErrorContext } from "@/context/ErrorProvider"

export const Error = () => {
  const { error } = useErrorContext()
  return <div>{error}</div>
}
