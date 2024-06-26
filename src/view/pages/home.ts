import { Components, Fragment } from '@app/view/utils'

import WebsiteHeader from '@app/view/components/shared/website-header'
import WebsiteFooter from '@app/view/components/shared/website-footer'
import ThoughtsList from '@app/view/components/thoughts/list'
import type { Thought } from '@app/domains/thoughts'

interface HomePageProps {
  recentThoughts: Thought[]
}

const HomePage = ({ recentThoughts }: HomePageProps) =>
  Fragment(
    WebsiteHeader({
      title: 'Tim on a Path',
    }),
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
              thoughts: recentThoughts,
            }),
          ),
        ),
      ),
    ),
    WebsiteFooter(),
  )

export default HomePage
