import type { QueryFunction } from "react-query"

const defaultErrorMessage = "There was an Error"

// TODO: use inline functions.
// TODO: Research how to do this better
export const fetchWithBaseURL: QueryFunction = ({
  queryKey,
}): Promise<Response> => {
  const path = Array.isArray(queryKey) ? queryKey?.[0] : queryKey
  const fetchParams =
    Array.isArray(queryKey) && queryKey.length >= 2
      ? queryKey[queryKey.length - 1]
      : {}
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/${path}`, fetchParams)
    .then((res) => res.json())
    .then((res) => {
      if (res?.success && !res?.success) {
        throw new Error(res?.message || res?.failReason || defaultErrorMessage)
      }
      return res
    })
}
