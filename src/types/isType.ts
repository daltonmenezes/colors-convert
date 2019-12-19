import { between, sameContent } from '../lib/utils'
import { HEX, RGB, RGBA, CMYK, COLOR, HSL } from './types'

// Accept:
//  - long form: #FFFFFF
//  - short form: #FFF
//  - long form with opacity: #FFFFFFFF (white with opacity FF=1)
export function isHex(color: any): color is HEX {
  const reg = /^#([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i
  return reg.test(color)
}

// Accept an object like this {r, g, b} with r,b,g numeric values in range [0, 255]
export function isRgb(color: any): color is RGB {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['r', 'g', 'b'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  return r && g && b
}

// TODO: add support for values in [0, 100]%
// TODO: accept also rgba without a, consider it 1 as default
// Accept an object like this {r, g, b, a} with r,g,b numeric values in range [0, 255] and a in range [0,1]
export function isRgba(color: any): color is RGBA {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['r', 'g', 'b', 'a'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  const a = typeof color.a === 'number' && between(color.a, [0, 1])
  return r && g && b && a
}

// TODO: add support for values in [0, 1]
// Accept an object like this {c, m, y, k} with c,m,y,k numeric values in range [0, 100]
export function isCmyk(color: any): color is CMYK {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['c', 'm', 'y', 'k'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 100])
  const c = isValid(color.c)
  const m = isValid(color.m)
  const y = isValid(color.y)
  const k = isValid(color.k)
  return c && m && y && k
}

// Accept HSL colors with:
//  - h (hue): [0-360]°
//  - s (saturation): [0-100]%
//  - l (lightness): [0-100]%
export function isHsl(color: any): color is HSL {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['h', 's', 'l'])) return false
  const isValid = (value: any, range: [number, number]) => typeof value === 'number' && between(value, range)
  const h = isValid(color.h, [0, 360])
  const s = isValid(color.s, [0, 100])
  const l = isValid(color.l, [0, 100])
  return h && s && l
}

export function isColor(color: any): color is COLOR {
  return isHex(color) || isRgb(color) || isRgba(color) || isCmyk(color)
}