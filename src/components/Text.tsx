import {
  classnames,
  fontSize,
  fontWeight,
  textColor,
  textDecoration,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const headerText = classnames(
  textColor('text-purple-100'),
  fontSize('text-2xl', 'md:text-4xl'),
  fontWeight('font-bold')
)
export function HeaderText({ children }: ChildrenProp) {
  return <p className={headerText}>{children}</p>
}

const bodyText = classnames(textColor('text-purple-200'))
export function BodyText({ children }: ChildrenProp) {
  return <p className={bodyText}>{children}</p>
}

const link = classnames(textDecoration('underline'))
export function Link({
  children,
  href,
}: ChildrenProp & {
  href: string
}) {
  return (
    <a className={link} href={href} rel="noreferrer noopener" target="_blank">
      {children}
    </a>
  )
}
