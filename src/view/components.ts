/**
 * Basic Template String Function
 */
export function HTML(strings: TemplateStringsArray, ...values: any[]) {
  const outputArray = values.map((value, index) => `${strings[index]}${value}`)

  return outputArray.join('') + strings[strings.length - 1]
}

export interface CommonProps {
  data?: {
    [x: string]: any
  }
  [x: string]: any
}

export const SelfClosedElement = (
  el: string,
  { id, class: className, data, ...rest }: CommonProps,
) => HTML`
  <${el} ${
    data
      ? Object.entries(data)
          .map(([key, value]) => HTML`data-${key}="${value}"`)
          .join(' ')
      : ''
  } ${
    rest
      ? Object.entries(rest)
          .map(([key, value]) => HTML`${key}="${value}"`)
          .join(' ')
      : ''
  }
/>
`

/**
 * Generic way to create an HTML element with
 * properties
 */
export const Element = (
  el: string,
  { data, ...rest }: CommonProps,
  children?: string,
) => HTML`
  <${el} ${
    data
      ? Object.entries(data)
          .map(([key, value]) => HTML`data-${key}="${value}"`)
          .join(' ')
      : ''
  } ${
    rest
      ? Object.entries(rest)
          .map(([key, value]) => HTML`${key}="${value}"`)
          .join(' ')
      : ''
  }>
    ${children || ''}
  </${el}>
`

export const Fragment = (...children: string[]) => children.join('\n')

/**
 * To add more elements, add them here
 */
const elements = [
  'Div',
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'A',
  'SVG',
  'Section',
  'Article',
  'Aside',
  'Button',
] as const

const selfClosedElements = ['Img'] as const

export const Components: {
  [K in (typeof elements)[number] | (typeof selfClosedElements)[number]]: (
    params: CommonProps,
    children?: string,
  ) => string
} = {
  ...elements.reduce(
    (a, c) => ({
      ...a,
      [c]: (params: CommonProps, children?: string) =>
        Element(c.toLowerCase(), params, children),
    }),
    {} as any,
  ),
  ...selfClosedElements.reduce(
    (a, c) => ({
      ...a,
      [c]: (params: CommonProps) => SelfClosedElement(c.toLowerCase(), params),
    }),
    {} as any,
  ),
}
