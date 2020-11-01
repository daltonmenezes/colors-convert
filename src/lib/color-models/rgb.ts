import { round } from 'lodash'
import { RGB, RGBA, CMYK, HEX, HSL, Color } from '../../types/types'
import { isRgb, isRgba, isHex, isCmyk, isHsl, isColor } from '../../types/isType'
import { applyFnToEachObjValue } from '../misc/utils'
import { hex2rgba } from './hex'
import { cmyk2rgb } from './cmyk'
import { hsl2rgb } from './hsl'
import { number0255ToHex } from '../../utils/hex-utils'
import { rgba2rgb } from './rgba'
import { hslaToRgb } from './hsla'
import { fromLongToShortRgbFormat, shortRgbFormatToRgbObject } from '../../utils/rgb-utils'
import { RGB_REGEX } from '../../constants/regex'

/**
 * Convert an rgb object to hex.
 * @param rgb color object to convert to hex
 * @returns hex color
 */
export function rgb2hex(rgb: RGB): HEX {
  if (!isRgb(rgb)) throw new Error(`${rgb} is not a rgb color.`)

  const hex = Object.values(rgb)
    .map((n) => number0255ToHex(n))
    .join('')
  return `#${hex}`
}

/**
 * Convert a rgb object to a cmyk object.
 * @param rgb color object to convert to cmyk
 * @returns cmyk color
 */
export function rgb2cmyk(rgb: RGB): CMYK {
  if (!isRgb(rgb)) throw new Error(`${rgb} is not a rgb color.`)

  const { r, g, b } = rgb
  // normalize r,g,b values (from 0-255 to 0-1)
  const r01 = r / 255
  const g01 = g / 255
  const b01 = b / 255

  if (r01 === 0 && g01 === 0 && b01 === 0) return { c: 0, m: 0, y: 0, k: 100 }

  const k = 1 - Math.max(r01, g01, b01)
  const c = (1 - r01 - k) / (1 - k)
  const m = (1 - g01 - k) / (1 - k)
  const y = (1 - b01 - k) / (1 - k)

  const roundedCmyk = applyFnToEachObjValue({ c, m, y, k }, (c: number) => round(c * 100)) as CMYK
  return roundedCmyk
}

/**
 * Convert a rgb object to hsl object.
 * @param rgb color to convert to HSL
 * @returns hsl color object
 */
export function rgb2hsl(rgb: RGB): HSL {
  if (!isRgb(rgb)) throw new Error(`${rgb} is not a rgb color.`)

  const { r, g, b } = rgb
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  // achromatic
  if (max === min) return { h: 0, s: 0, l: (l / 255) * 100 }

  const chroma = max - min
  const s = Math.abs(chroma / (1 - Math.abs(2 * l - 1))) * 100 - 1

  let h
  switch (max) {
    case r:
      h = 60 * ((g - b) / chroma) + (g < b ? 360 : 0)
      break
    case g:
      h = 120 + (60 * (b - r)) / chroma
      break
    case b:
      h = 240 + (60 * (r - g)) / chroma
      break
  }

  const hsl = { h, s, l: (l / 255) * 100 }
  const hslRounded = applyFnToEachObjValue(hsl, (c: number) => round(c)) as HSL

  return hslRounded
}

/**
 * Convert an rgb color to a rgba color adding 1 as alpha.
 * @param rgb color to convert to rgba
 * @returns rgba color object
 */
export function rgb2rgba(rgb: RGB): RGBA {
  if (!isRgb(rgb)) throw new Error(`${rgb} is not a rgb color.`)

  return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 }
}

/**
 * Convert a generic color to rgb.
 * @param color color to convert to rgb
 * @returns rgb color object
 */
export function color2rgb(color: Color): RGB {
  if (!isColor(color)) throw new Error(`${color} is not a valid color format.`)

  if (isHex(color)) return rgba2rgb(hex2rgba(color))
  else if (isRgb(color)) return color
  else if (isRgba(color)) return rgba2rgb(color)
  else if (isCmyk(color)) return cmyk2rgb(color)
  else if (isHsl(color)) return hsl2rgb(color)
  else return hslaToRgb(color) // hsla
}

/**
 * Convert a string in these two formats to a rgb object:
 *  - 255, 0, 255 (short format) -> {r: 255, g: 0, b: 255}
 *  - rgb(255, 0, 255) (long format) -> {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to rgb
 * @returns rgb color object
 */
export function rgbString2Object(rgbString: string): RGB {
  // check short and long formats
  const isShortFormat = RGB_REGEX.short.test(rgbString)
  const isLongFormat = RGB_REGEX.long.test(rgbString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(
      `${rgbString} is not a valid format. The accepted formats are 'r, g, b' and 'rgb(r, g, b)' with r, g, b in [0, 255].`
    )

  // convert rgbString to short format: 'R, G, B'
  const rgbStringCleanShortFormat = isShortFormat ? rgbString : fromLongToShortRgbFormat(rgbString)
  return shortRgbFormatToRgbObject(rgbStringCleanShortFormat)
}
