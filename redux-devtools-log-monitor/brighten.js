"use strict";
function default_1(hexColor, lightness) {
    let hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex.replace(/(.)/g, '$1$1');
    }
    let lum = lightness || 0;
    let rgb = '#';
    let c;
    for (let i = 0; i < 3; ++i) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }
    return rgb;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=brighten.js.map