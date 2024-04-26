import { isEmail } from './utils'

describe('Utils :: isEmail', () => {
  describe('When given a valid email', () => {
    it('returns true', () => {
      const email = 'tim@email.com'
      const expected = true
      const actual = isEmail(email)

      expect(actual).toBe(expected)
    })
  })

  describe('When given an invalid email', () => {
    it('returns false', () => {
      const email = 'tim.com'
      const expected = false
      const actual = isEmail(email)

      expect(actual).toBe(expected)
    })
  })
})
