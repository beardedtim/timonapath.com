import { Components, Fragment } from '@app/view/utils'

const CreatePost = () =>
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
      {
        class: 'container is-flex is-flex-direction-column',
      },
      Components.Form(
        {
          id: 'create-form',
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
                Components.TextArea({
                  id: 'description',
                  class: 'textarea',
                  name: 'description',
                  required: 'required',
                }),
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
              Components.TextArea({
                id: 'editor',
                name: 'body',
              }),
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
                  'Create',
                ),
              ),
              Components.Div(
                {
                  class: 'control',
                },
                Components.Button(
                  {
                    class: 'button is-light',
                    type: 'reset',
                  },
                  'Clear',
                ),
              ),
            ),
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

export default CreatePost
