import { useCallback, useState } from 'react'

const useAsync = (asyncFunction) => {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const wrapperFunction = useCallback(
    async (...args) => {
      try {
        setError(null)
        setPending(true)
        return await asyncFunction(...args)
      } catch (error) {
        setError(error)
        return
      } finally {
        setPending(false)
      }
    },
    [asyncFunction]
  )
  return [error, pending, wrapperFunction]
}

export default useAsync
