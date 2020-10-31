import { color2string, color2cssString } from '../../index'

////////////////////////////////////////////////////////
// color2string
////////////////////////////////////////////////////////

test(`color2string`, () => {
  expect(color2string('#000000')).toBe('#000000')
  expect(color2string({ r: 0, g: 0, b: 0 })).toBe('0, 0, 0')
  expect(color2string({ r: 0, g: 0, b: 0, a: 0 })).toBe('0, 0, 0, 0')
  expect(color2string({ c: 0, m: 0, y: 0, k: 0 })).toBe('0%, 0%, 0%, 0%')
  expect(color2string({ h: 0, s: 0, l: 0 })).toBe('0, 0%, 0%')

  expect(() => color2string({ h: -1, s: 90, l: 50 })).toThrowError()
})

////////////////////////////////////////////////////////
// color2cssString
////////////////////////////////////////////////////////

test(`color2cssString`, () => {
  expect(color2cssString('#000000')).toBe('#000000')
  expect(color2cssString({ r: 0, g: 0, b: 0 })).toBe('rgb(0, 0, 0)')
  expect(color2cssString({ r: 0, g: 0, b: 0, a: 0 })).toBe('rgba(0, 0, 0, 0)')
  expect(color2cssString({ c: 0, m: 0, y: 0, k: 0 })).toBe('cmyk(0%, 0%, 0%, 0%)')
  expect(color2cssString({ h: 0, s: 0, l: 0 })).toBe('hsl(0, 0%, 0%)')

  expect(() => color2string({ h: -1, s: 90, l: 50 })).toThrowError()
})