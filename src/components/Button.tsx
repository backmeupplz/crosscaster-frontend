import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  fontWeight,
  opacity,
  padding,
  textColor,
} from 'classnames/tailwind'

const button = (disabled: boolean) =>
  classnames(
    backgroundColor({
      'bg-purple-700': !disabled,
      'hover:bg-purple-500': !disabled,
      'active:bg-purple-800': !disabled,
    }),
    textColor('text-white'),
    fontWeight('font-bold'),
    padding('py-2', 'px-4'),
    borderRadius('rounded'),
    opacity({ 'opacity-50': disabled }),
    cursor({ 'cursor-not-allowed': disabled })
  )
export default function ({
  title,
  loading,
  disabled,
  onClick,
}: {
  title: string
  loading: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="submit"
      className={button(loading || !!disabled)}
      disabled={loading || !!disabled}
      onClick={() => {
        if (!loading) {
          onClick()
        }
      }}
    >
      {loading ? 'Loading...' : title}
    </button>
  )
}
