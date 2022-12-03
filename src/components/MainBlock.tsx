import { BodyText, HeaderText, Link } from 'components/Text'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-start'),
  gap('gap-2')
)
export default function () {
  return (
    <div className={container}>
      <HeaderText>Crosscaster</HeaderText>
      <BodyText>Cast to Farcaster from your Twitter profile!</BodyText>
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
    </div>
  )
}
