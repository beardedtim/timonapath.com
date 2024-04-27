import { Components, Fragment } from '@app/view/utils'

import WebsiteHeader from '@app/view/components/shared/website-header'
import WebsiteFooter from '@app/view/components/shared/website-footer'
import ThoughtsList from '@app/view/components/thoughts/list'
import { Thought } from '@app/domains/thoughts'

interface ThoughtsPageProps {
  thoughts: Thought[]
}

const Thoughts = ({ thoughts }: ThoughtsPageProps) =>
  Fragment(
    WebsiteHeader({ title: 'Thoughts | Tim on a Path' }),
    Components.Main(
      {},
      Fragment(
        Components.Section(
          {
            class: 'hero is-medium is-info',
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
                'Recent Thoughts',
              ),
              Components.H3(
                {
                  class: 'subtitle',
                },
                'What do you think about all this?',
              ),
            ),
          ),
        ),
        Components.Section(
          {
            class: 'section',
          },
          Fragment(
            ThoughtsList({
              thoughts: thoughts,
            }),
          ),
        ),
      ),
    ),
    WebsiteFooter(),
  )

export default Thoughts
