import { BodyText } from 'components/Text'
import { TargetedEvent } from 'preact/compat'
import {
  deleteSubscription,
  getSubscription,
  setSubscription,
} from 'helpers/api'
import { useEffect, useState } from 'preact/hooks'
import Button from 'components/Button'
import classnames, { borderRadius, padding } from 'classnames/tailwind'

const textField = classnames(padding('px-4', 'py-2'), borderRadius('rounded'))
export default function ({ mnemonic }: { mnemonic: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [twitterUsername, setTwitterUsername] = useState<string | undefined>(
    undefined
  )
  const [newTwitterUsername, setNewTwitterUsername] = useState<string>('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoading(false)
    setError(undefined)
    setTwitterUsername(undefined)
    setLoaded(false)
  }, [mnemonic])
  useEffect(() => {
    setNewTwitterUsername(twitterUsername || '')
  }, [twitterUsername])
  const [mirrorLoading, setMirrorLoading] = useState(false)
  const [mirrorError, setMirrorError] = useState<string | undefined>(undefined)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined)
  return (
    <>
      <BodyText>
        This is a Farcaster user! Please press the button below to check if you
        already have a subscription. The reason you have to press this button is
        that the browser will send your recovery phrase to the backend. I don't
        think it would be polite to send your recovery phrase anywhere
        automatically. However, unless you set a subscription, the seed phrase
        will not be stored on the backend.
      </BodyText>
      <Button
        title="Check subscription"
        loading={loading}
        onClick={async () => {
          setLoading(true)
          setLoaded(false)
          setError(undefined)
          setTwitterUsername(undefined)
          try {
            const subscription = await getSubscription(mnemonic)
            setLoaded(true)
            setTwitterUsername(subscription.twitterUsername)
          } catch (error) {
            setError(error instanceof Error ? error.message : String(error))
          } finally {
            setLoading(false)
          }
        }}
      />
      {error && <BodyText>{error}</BodyText>}
      {loaded && (
        <>
          <BodyText>
            {twitterUsername
              ? `All new tweets from @${twitterUsername} will be casted to your Farcaster account automatically. You can delete this subscription by pressing the button below. This will remove all your data from the backend (including the recovery phrase).`
              : "You don't have a subscription to a Twitter username (which means there is no data on the backend about you at all). Please enter the Twitter username from which you want to cast tweets to your Farcaster account automatically and press the button below to apply the changes. This will save the recovery phrase on the backend."}
          </BodyText>
          <input
            value={newTwitterUsername}
            type="text"
            className={textField}
            onInput={(e: TargetedEvent<HTMLInputElement>) =>
              setNewTwitterUsername(e.currentTarget.value)
            }
            placeholder="Twitter username without @"
          />
          <>
            <Button
              title={`Crosscast from @${newTwitterUsername}`}
              disabled={
                newTwitterUsername === twitterUsername ||
                !newTwitterUsername ||
                !newTwitterUsername.match(/^[\w_]{1,15}$/)
              }
              loading={mirrorLoading}
              onClick={async () => {
                setMirrorLoading(true)
                setMirrorError(undefined)
                try {
                  console.log(mnemonic, newTwitterUsername)
                  await setSubscription(mnemonic, newTwitterUsername)
                  setTwitterUsername(newTwitterUsername)
                  alert(
                    `Successfully enabled crosscasting from @${newTwitterUsername}!`
                  )
                } catch (error) {
                  setMirrorError(
                    error instanceof Error ? error.message : String(error)
                  )
                } finally {
                  setMirrorLoading(false)
                }
              }}
            />
            {mirrorError && <BodyText>{mirrorError}</BodyText>}
          </>
          {twitterUsername && (
            <>
              <Button
                title="Disable crosscasting and delete data"
                loading={deleteLoading}
                onClick={async () => {
                  setDeleteLoading(true)
                  setDeleteError(undefined)
                  try {
                    await deleteSubscription(mnemonic)
                    setTwitterUsername(undefined)
                    setDeleteLoading(false)
                    alert(
                      'Successfully deleted your data and disabled casting!'
                    )
                  } catch (error) {
                    setDeleteError(
                      error instanceof Error ? error.message : String(error)
                    )
                  } finally {
                    setDeleteLoading(false)
                  }
                }}
              />
              {deleteError && <BodyText>{deleteError}</BodyText>}
            </>
          )}
        </>
      )}
    </>
  )
}
