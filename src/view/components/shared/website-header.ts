import { Components, Fragment } from '@app/view/utils'

interface Props {
  title?: string
}

const WebsiteHeader = ({ title }: Props) =>
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
              title ?? 'Tim on a Path',
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
  )

export default WebsiteHeader
