import { Components, Fragment } from '@app/view/utils'
import Divider from '@app/view/components/shared/divider'
import ThoughtsListItem from './list-item'

interface Thought {
  _id: string
  title: string
  description?: string
  last_updated: string
  published_at: string
}

interface ThoughtListProps {
  thoughts: Thought[]
}

const ThoughtsList = ({ thoughts }: ThoughtListProps) =>
  Components.Div(
    {
      class: 'thoughts-list is-flex is-flex-direction-column',
    },
    Fragment(
      ...thoughts.map((thought, i) => {
        if (i !== thoughts.length - 1) {
          return Fragment(ThoughtsListItem(thought), Divider())
        }

        return ThoughtsListItem(thought)
      }),
    ),
  )

export default ThoughtsList
