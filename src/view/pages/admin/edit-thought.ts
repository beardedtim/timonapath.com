import { Thought } from '@app/domains/thoughts'
import WebsiteFooter from '@app/view/components/shared/website-footer'
import WebsiteHeader from '@app/view/components/shared/website-header'
import { Components, Fragment } from '@app/view/utils'

interface EditThoughtProps {
  thought: Thought
}

const EditThought = ({ thought }: EditThoughtProps) =>
  Fragment(
    WebsiteHeader({
      title: `Edit ${thought.title} | Admin`,
    }),
    Components.Main(
      {
        class: 'container is-flex is-flex-direction-column',
      },
      Components.Form(
        {
          id: 'edit-form',
          data: {
            id: thought._id,
          },
        },
        Fragment(
          Components.H1(
            {
              class: 'title is-3',
            },
            'Create a Post',
          ),
          Components.Div(
            {
              class: 'field mb-6',
            },
            Fragment(
              Components.Label(
                {
                  for: 'title',
                },
                'Title',
              ),
              Components.Div(
                {
                  class: 'control',
                },
                Components.Input({
                  id: 'title',
                  class: 'input is-large',
                  name: 'title',
                  required: 'required',
                  type: 'text',
                  placeholder: 'What is on your mind?',
                  value: thought.title,
                }),
              ),
              Components.P(
                {
                  class: 'help',
                },
                'What is something that you think would help grab attention?',
              ),
            ),
          ),
          Components.Div(
            {
              class: 'field mb-6',
            },
            Fragment(
              Components.Label(
                {
                  for: 'description',
                },
                'Description',
              ),
              Components.Div(
                {
                  class: 'control',
                },
                Components.TextArea(
                  {
                    id: 'description',
                    class: 'textarea',
                    name: 'description',
                    required: 'required',
                  },
                  thought.description,
                ),
              ),
              Components.P(
                {
                  class: 'help',
                },
                'How would you hook someone into reading the rest?',
              ),
            ),
          ),
          Components.Div(
            {
              class: 'field mb-6',
            },
            Fragment(
              Components.Label(
                {
                  class: 'label',
                  for: 'editor',
                },
                'Body',
              ),
              Components.TextArea(
                {
                  id: 'editor',
                  name: 'body',
                },
                thought.body,
              ),
            ),
          ),
          Components.Div(
            {
              class: 'field mb-6',
            },
            Fragment(
              Components.Input({
                type: 'checkbox',
                name: 'published',
                class: 'switch',
                id: 'is-published',
                checked: thought.published ? 'checked' : '',
              }),
              Components.Label(
                {
                  for: 'is-published',
                  class: 'label',
                },
                'Published',
              ),
            ),
          ),
          Components.Div(
            {
              class: 'field is-grouped',
            },
            Fragment(
              Components.Div(
                {
                  class: 'control',
                },
                Components.Button(
                  {
                    class: 'button is-link',
                    type: 'submit',
                  },
                  'Update',
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    WebsiteFooter(),
  )

export default EditThought
