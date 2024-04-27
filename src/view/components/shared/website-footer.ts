import { Components, Fragment } from '@app/view/utils'

const WebsiteFooter = () =>
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
  )

export default WebsiteFooter
