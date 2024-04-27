import { formatDistanceToNow } from 'date-fns'
import { Components, Fragment } from '@app/view/utils'

interface ThoughtHeroProps {
  title: string
  description?: string
  published_at: string
  last_updated: string
}

const ThoughtHero = ({
  title,
  description,
  published_at,
  last_updated,
}: ThoughtHeroProps) =>
  Components.Section(
    {
      class: 'hero is-medium is-success',
    },
    Fragment(
      Components.Div(
        {
          class: 'hero-head',
        },
        Components.Nav(
          {
            class: 'navbar',
          },
          Components.Div(
            {
              class: 'container',
            },
            Fragment(
              Components.Div(
                {
                  class: 'navbar-brand',
                },
                Components.A(
                  {
                    href: '/',
                    class: 'navbar-item has-text-dark hero-link',
                  },
                  'Tim on a Path',
                ),
              ),
              Components.Div(
                {
                  id: 'main-menu',
                  class: 'navbar-menu',
                },
                Components.Div(
                  {
                    class: 'navbar-end',
                  },
                  Fragment(
                    Components.A(
                      {
                        class: 'navbar-item has-text-dark hero-link',
                        href: '/',
                      },
                      'Home',
                    ),
                    Components.A(
                      {
                        class: 'navbar-item has-text-dark hero-link',
                        href: '/thoughts',
                      },
                      'Thoughts',
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      Components.Div(
        {
          class: 'hero-body',
        },
        Components.Div(
          {
            class: 'container has-text-centered',
          },
          Fragment(
            Components.H2(
              {
                class: 'title',
              },
              title,
            ),
            description
              ? Components.H3(
                  {
                    class: 'subtitle',
                  },
                  description,
                )
              : '',
          ),
        ),
      ),
      Components.Div(
        {
          class: 'hero-foot py-4',
        },
        Components.Div(
          {
            class:
              'container is-flex is-align-items-center is-justify-content-space-around',
          },
          Fragment(
            Components.P(
              {
                class: 'is-size-7',
              },
              Fragment(
                'Posted ',
                Components.Time(
                  {
                    datetime: published_at,
                  },
                  formatDistanceToNow(published_at, { addSuffix: true }),
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
                    datatime: published_at,
                  },
                  formatDistanceToNow(last_updated, { addSuffix: true }),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )

export default ThoughtHero
