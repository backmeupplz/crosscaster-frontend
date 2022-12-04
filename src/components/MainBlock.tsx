import { BodyText, HeaderText, Link } from 'components/Text'
import Wallet from 'components/Wallet'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  textAlign,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  gap('gap-2')
)
const separator = classnames(textAlign('text-center'))
export default function () {
  return (
    <div className={container}>
      <HeaderText>Crosscaster</HeaderText>
      <BodyText>
        Cast to Farcaster from your Twitter profile! After you setup
        Crosscaster, whatever you tweet will be crosscasted to Farcaster
        automatically. Crosscaster checks tweets every 15 minutes.
      </BodyText>
      <BodyText>
        Nothing is stored in the browser. The code for{' '}
        <Link href="https://github.com/backmeupplz/crosscaster-frontend">
          the frontend
        </Link>{' '}
        and{' '}
        <Link href="https://github.com/backmeupplz/crosscaster-frontend">
          the backend
        </Link>{' '}
        is open source. Built by <Link href="https://bdut.ch">@borodutch</Link>{' '}
        with love.
      </BodyText>
      <div className={separator}>
        <BodyText>***</BodyText>
      </div>
      <Wallet />
    </div>
  )
}
