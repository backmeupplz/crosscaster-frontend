import {
  classnames,
  container,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(
  container('container'),
  margin('mx-auto'),
  padding('pt-4', 'pb-10', 'px-2', 'md:px-4'),
  maxWidth('max-w-prose')
)
export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
