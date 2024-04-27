import { formatDistanceToNow } from 'date-fns'
import { Components, Fragment } from '@app/view/utils'

interface ThoughtsListItemProps {
  _id: string
  title: string
  description?: string
  published_at: string
  last_updated: string
}

const ThoughtsListItem = ({
  _id,
  title,
  description,
  published_at,
  last_updated,
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
          Components.Div(
            {
              class: 'is-flex',
            },
            Fragment(
              Components.P(
                {
                  class: 'mr-4 is-size-7',
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
              Components.P(
                {
                  class: 'is-size-7',
                },
                Fragment(
                  'Last Updated ',
                  Components.Time(
                    {
                      datetime: last_updated,
                    },
                    formatDistanceToNow(last_updated, {
                      addSuffix: true,
                    }),
                  ),
                ),
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
