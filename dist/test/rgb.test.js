import { rgb2hex, rgb2cmyk, rgb2hsl, rgba2rgb, rgb2rgba, color2rgb } from '../index';
////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////
test("rgb2hex", function () {
    expect(rgb2hex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgb2hex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
});
////////////////////////////////////////////////////////
// rgb2cmyk
////////////////////////////////////////////////////////
test("rgb2cmyk", function () {
    expect(rgb2cmyk({ r: 0, g: 0, b: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(rgb2cmyk({ r: 255, g: 255, b: 255 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 });
    expect(rgb2cmyk({ r: 66, g: 135, b: 245 })).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 });
});
////////////////////////////////////////////////////////
// rgb2hsl
////////////////////////////////////////////////////////
test("rgb2hsl", function () {
    expect(rgb2hsl({ r: 0, g: 0, b: 0 })).toStrictEqual({ h: 0, s: 0, l: 0 });
    expect(rgb2hsl({ r: 255, g: 255, b: 255 })).toStrictEqual({ h: 0, s: 0, l: 100 });
    expect(rgb2hsl({ r: 242, g: 185, b: 13 })).toStrictEqual({ h: 45, s: 90, l: 50 });
    expect(rgb2hsl({ r: 242, g: 242, b: 13 })).toStrictEqual({ h: 60, s: 90, l: 50 });
    expect(rgb2hsl({ r: 204, g: 242, b: 13 })).toStrictEqual({ h: 70, s: 90, l: 50 });
    expect(rgb2hsl({ r: 13, g: 242, b: 51 })).toStrictEqual({ h: 130, s: 90, l: 50 });
    expect(rgb2hsl({ r: 13, g: 223, b: 242 })).toStrictEqual({ h: 185, s: 90, l: 50 });
    expect(rgb2hsl({ r: 89, g: 13, b: 242 })).toStrictEqual({ h: 260, s: 90, l: 50 });
    expect(rgb2hsl({ r: 242, g: 13, b: 204 })).toStrictEqual({ h: 310, s: 90, l: 50 });
    expect(rgb2hsl({ r: 242, g: 13, b: 17 })).toStrictEqual({ h: 359, s: 90, l: 50 });
});
////////////////////////////////////////////////////////
// rgba2rgb
////////////////////////////////////////////////////////
test("rgba2rgb", function () {
    expect(rgba2rgb({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 });
});
////////////////////////////////////////////////////////
// rgb2rgba
////////////////////////////////////////////////////////
test("rgb2rgba", function () {
    expect(rgb2rgba({ r: 0, g: 0, b: 0 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
});
////////////////////////////////////////////////////////
// color2rgb
////////////////////////////////////////////////////////
test("color2rgb", function () {
    expect(color2rgb('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 });
    expect(color2rgb({ r: 0, g: 0, b: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(color2rgb({ r: 0, g: 0, b: 0, a: 1 })).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(color2rgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 });
    expect(color2rgb({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 });
});
//# sourceMappingURL=rgb.test.js.map