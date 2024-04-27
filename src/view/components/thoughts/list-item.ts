import { formatDistanceToNow } from 'date-fns'
import { Components, Fragment } from '@app/view/utils'

interface ThoughtsListItemProps {
  _id: string
  title: string
  description?: string
  published_at: string
}

const ThoughtsListItem = ({
  _id,
  title,
  description,
  published_at,
}: ThoughtsListItemProps) =>
  Components.Article(
    {
      class: 'thoughts-list-item column is-full mb-4 py-4',
    },
    Fragment(
      Components.H1(
        {
          class: 'title is-4',
        },
        title,
      ),
      description
        ? Components.H3(
            {
              class: 'subtitle is-5',
            },
            description,
          )
        : '',
      Components.Footer(
        {
          class:
            'is-flex is-align-items-center is-justify-content-space-between',
        },
        Fragment(
          Components.P(
            {
              class: '',
            },
            Fragment(
              'Posted ',
              Components.Time(
                {
                  datetime: published_at,
                },
                formatDistanceToNow(published_at, {
                  addSuffix: true,
                }),
              ),
            ),
          ),
          Components.Div(
            {},
            Components.A(
              {
                href: `/thoughts/${_id}`,
                class: 'button is-link',
              },
              'Read the full thought',
            ),
          ),
        ),
      ),
    ),
  )

export default ThoughtsListItem
