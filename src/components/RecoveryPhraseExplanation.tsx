import { BodyText, Link } from 'components/Text'

export default function () {
  return (
    <>
      <BodyText>
        First, enter the recovery phrase from your Farcaster settings below (not
        the recovery phrase from your connected wallet).
      </BodyText>
      <BodyText>
        Crosscaster needs your recovery phrase to cast on your behalf.{' '}
        <Link href="https://t.me/c/1449330344/1448">
          When the hubs launch on Farcaster
        </Link>
        , the recovery phrase will no longer be needed. Instead, you will be
        able to delegate casting rights to Crosscaster.
      </BodyText>
      <BodyText>
        But for now it is what it is. The recovery phrase will be securely
        stored on a centralized backend to cast every tweet that you post on
        Twitter. In my defense,{' '}
        <Link href="https://blog.borodutch.com/how-to-secure-the-hell-out-of-your-mongodb-in-2021/">
          I've been in database security business for quite a while
        </Link>{' '}
        so your recovery phrases are ironclad.
      </BodyText>
      <BodyText>
        And, after all, it's just Farcaster recovery phrases. What could a
        hacker do with it? Steal your casts?
      </BodyText>
      <BodyText>
        Anyway, enter your recovery phrase below. When you close or refresh this
        website all the data will be gone — again, nothing is stored here.
      </BodyText>
    </>
  )
}
