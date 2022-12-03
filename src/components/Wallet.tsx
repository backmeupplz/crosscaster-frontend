import { BodyText } from 'components/Text'
import { TargetedEvent } from 'preact/compat'
import { ethers } from 'ethers'
import { useEffect, useState } from 'preact/hooks'
import RecoveryPhraseExplanation from 'components/RecoveryPhraseExplanation'
import classnames, { borderRadius, padding } from 'classnames/tailwind'
import useIsFarcasterUser from 'hooks/useIsFarcasterUser'

const textField = classnames(padding('px-4', 'py-2'), borderRadius('rounded'))
export default function () {
  const [mnemonic, setMnemonic] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null)
  useEffect(() => {
    if (!mnemonic) {
      setWallet(null)
      setError(null)
      return
    }
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic)
      setError(null)
      setWallet(wallet)
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error))
      setWallet(null)
    }
  }, [mnemonic])
  const {
    loading,
    error: farcasterUserError,
    isFarcasterUser,
  } = useIsFarcasterUser(wallet?.address)
  return (
    <>
      <RecoveryPhraseExplanation />
      <input
        type="text"
        className={textField}
        onInput={(e: TargetedEvent<HTMLInputElement>) =>
          setMnemonic(e.currentTarget.value)
        }
      />
      {error && <BodyText>{error}</BodyText>}
      {wallet && (
        <>
          <BodyText>Your address is: {wallet.address}.</BodyText>
          {loading && (
            <BodyText>Checking if this is a Farcaster user...</BodyText>
          )}
          {farcasterUserError && (
            <BodyText>
              Error checking if this is a Farcaster user:{' '}
              {farcasterUserError.message}
            </BodyText>
          )}
          {isFarcasterUser && (
            <BodyText>
              This is a Farcaster user! You can now cross-cast to Farcaster.
            </BodyText>
          )}
          {!loading && !farcasterUserError && !isFarcasterUser && (
            <BodyText>
              This is not a Farcaster user. Please, enter a valid Farcaster user
              recovery phrase.
            </BodyText>
          )}
        </>
      )}
    </>
  )
}
