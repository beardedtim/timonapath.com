import { Components, Fragment } from '@app/view/utils'

import WebsiteFooter from '@app/view/components/shared/website-footer'
import ThoughtHero from '@app/view/components/thoughts/hero'

import { Thought } from '@app/domains/thoughts'

interface ThoughtPageProps {
  thought: Thought
}

const Thought = ({ thought }: ThoughtPageProps) =>
  Fragment(
    Components.Main(
      {},
      Fragment(
        ThoughtHero({
          title: thought.title,
          description: thought.description,
          last_updated: thought.last_updated,
          published_at: thought.published_at,
        }),
        Components.Section(
          {
            class: 'section',
          },
          Components.Div(
            {
              class: 'content container is-fullhd',
            },
            thought.body,
          ),
        ),
      ),
    ),
    WebsiteFooter(),
  )

export default Thought
