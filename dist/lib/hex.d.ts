import { RGB, RGBA, CMYK } from '../types/types';
export declare const hex2rgbOrRgba: (hex: string) => RGB | RGBA;
export declare const hex2rgba: (hex: string, alpha?: number) => RGBA;
export declare const hex2hexWithAlpha: (hex: string, alpha: number) => string;
export declare const hex2cmyk: (hex: string) => CMYK;