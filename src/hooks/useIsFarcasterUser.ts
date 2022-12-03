import { useEffect, useState } from 'preact/hooks'
import farcasterRegistry from 'helpers/farcasterRegistry'

export default function (address?: string) {
  if (!address) {
    return {
      loading: false,
      error: null,
      isFarcasterUser: false,
    }
  }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isFarcasterUser, setIsFarcasterUser] = useState(false)

  useEffect(() => {
    async function checkIsFarcasterUser() {
      setLoading(true)
      setError(null)
      try {
        const id = await farcasterRegistry.idOf(address)
        setIsFarcasterUser(id.gt(0))
      } catch {
        setError(new Error('Error fetching Farcaster user'))
      } finally {
        setLoading(false)
      }
    }
    void checkIsFarcasterUser()
  }, [address])

  return {
    loading,
    error,
    isFarcasterUser,
  }
}
