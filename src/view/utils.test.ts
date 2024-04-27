import { Fragment, HTML, SelfClosedElement, Element } from './utils'

describe('Fragment', () => {
  describe('When given no children', () => {
    it('returns an empty string', () => {
      const expected = ''
      const actual = Fragment()

      expect(actual).toBe(expected)
    })
  })

  describe('When given a single child', () => {
    it('returns the expected string', () => {
      const expected = 'Hello'
      const actual = Fragment('Hello')

      expect(actual).toBe(expected)
    })
  })

  describe('When given multiple children', () => {
    it('returns the expected string', () => {
      const expected = 'Hello\nWorld'
      const actual = Fragment('Hello', 'World')

      expect(actual).toBe(expected)
    })
  })
})

describe('HTML', () => {
  describe('When called as a template literal function', () => {
    it('returns the expected string', () => {
      const name = 'Tim'
      const expected = '<h1>Hello, Tim!</h1>'
      const actual = HTML`<h1>Hello, ${name}!</h1>`

      expect(actual).toBe(expected)
    })
  })
})

describe('SelfClosedElement', () => {
  describe('When given just the element', () => {
    it('returns the expected string', () => {
      const expected = '<br  />'
      const actual = SelfClosedElement('br', {})

      expect(actual).toBe(expected)
    })
  })

  describe('When given data fields', () => {
    it('returns the expected string', () => {
      const expected = '<br data-id="123" data-foo="bar" />'
      const actual = SelfClosedElement('br', {
        data: { id: '123', foo: 'bar' },
      })

      expect(actual).toBe(expected)
    })
  })

  describe('When given other attributes', () => {
    it('returns the expected string', () => {
      const expected = '<br  id="123" class="bar"/>'
      const actual = SelfClosedElement('br', { id: '123', class: 'bar' })

      expect(actual).toBe(expected)
    })
  })
})

describe('Element', () => {
  describe('When given just the element', () => {
    it('returns the expected string', () => {
      const expected = `<p  >
  
</p>`
      const actual = Element('p', {})

      expect(actual).toBe(expected)
    })
  })

  describe('When given data fields', () => {
    it('returns the expected string', () => {
      const expected = `<p data-id="123" data-foo="bar" >
  
</p>`
      const actual = Element('p', {
        data: { id: '123', foo: 'bar' },
      })

      expect(actual).toBe(expected)
    })
  })

  describe('When given other attributes', () => {
    it('returns the expected string', () => {
      const expected = `<p  id="123" class="bar">
  
</p>`
      const actual = Element('p', { id: '123', class: 'bar' })

      expect(actual).toBe(expected)
    })
  })

  describe('When given a child', () => {
    it('returns the expected string', () => {
      const expected = `<p  id="123" class="bar">
  Hello, world
</p>`
      const actual = Element('p', { id: '123', class: 'bar' }, 'Hello, world')

      expect(actual).toBe(expected)
    })
  })
})
