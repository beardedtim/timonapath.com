import { Components, Fragment } from './utils'

import ThoughtsList from '@app/view/components/thoughts/list'

export const HomePage = () =>
  Fragment(
    Components.Header(
      {},
      Components.Nav(
        {
          class: 'navbar is-fixed-top',
          role: 'navigation',
          'aria-label': 'main navigation',
        },
        Fragment(
          Components.Div(
            {
              class: 'navbar-brand',
            },
            Components.A(
              {
                class: 'navbar-item',
                href: '/',
              },
              Components.H1(
                {
                  class: 'logo-name title',
                },
                'Tim on a Path',
              ),
            ),
          ),
          Components.Div(
            {
              id: 'navar',
              class: 'navbar-menu',
            },
            Components.Div(
              {
                class: 'navbar-start',
              },
              Fragment(
                Components.A(
                  {
                    class: 'navbar-item',
                    href: '/',
                  },
                  'Home',
                ),
                Components.A(
                  {
                    class: 'navbar-item',
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
    Components.Main(
      {},
      Fragment(
        Components.Section(
          {
            class: 'hero is-medium is-link',
          },
          Components.Div(
            {
              class: 'hero-body',
            },
            Fragment(
              Components.H2(
                {
                  class: 'title',
                },
                'We all are on a path to somewhere',
              ),
              Components.H3(
                {
                  class: 'subtitle',
                },
                'Here are my thoughts about what that path is like',
              ),
            ),
          ),
        ),
        Components.Section(
          {
            class: 'section',
          },
          Fragment(
            Components.H3(
              {
                class: 'title',
              },
              'Recent Thoughts',
            ),
            ThoughtsList({
              thoughts: [
                {
                  _id: '123',
                  title: 'My First Post',
                  description:
                    'In this post, we describe what this project is and why we are starting it. Together',
                  published_at: new Date().toISOString(),
                  last_updated: new Date().toDateString(),
                },
                {
                  _id: '1235',
                  title: 'My Second Post',
                  published_at: new Date().toISOString(),
                  last_updated: new Date().toDateString(),
                },
              ],
            }),
          ),
        ),
      ),
    ),
    Components.Footer(
      {
        class: 'footer',
      },
      Components.Div(
        {
          class: 'content has-text-centered',
        },
        Components.P(
          {},
          Fragment(
            'Tim on a Path is made by',
            Components.A(
              {
                href: 'https://github.com/beardedtim',
                target: '_blank',
                rel: 'noopener',
              },
              'Tim Roberts',
            ),
          ),
        ),
      ),
    ),
  )
