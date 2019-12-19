import { cmyk2rgb, cmyk2hex, cmyk2hsl } from '../index'

////////////////////////////////////////////////////////
// cmyk2rgb
////////////////////////////////////////////////////////

test(`cmyk2rgb`, () => {
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(cmyk2rgb({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ r: 66, g: 135, b: 245 })
  // expect(hex2cmyk('')).toThrow(new Error(' is not a cmyk color.'))
})

////////////////////////////////////////////////////////
// cmyk2hex
////////////////////////////////////////////////////////

test(`cmyk2hex`, () => {
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual('#ffffff')
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual('#000000')
  expect(cmyk2hex({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual('#4287f5')
  // expect(cmyk2hex('')).toThrow(new Error(' is not a cmyk color.'))
})

////////////////////////////////////////////////////////
// cmyk2hsl
////////////////////////////////////////////////////////

// TODO: implement it
test(`cmyk2hsl`, () => {
  // expect(cmyk2hsl({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  // expect(cmyk2hsl({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  // expect(cmyk2hsl({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ h: 73, s: 45, l: 0 })
  // expect(cmyk2hsl('')).toThrow(new Error(' is not a cmyk color.'))
})