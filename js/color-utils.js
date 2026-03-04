// ============================================================
//  COLOR UTILS
// ============================================================
function hexRgb(hex) {
    return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
}
function lighten(hex, a) { const c = hexRgb(hex); return `rgb(${Math.min(255, c.r + a)},${Math.min(255, c.g + a)},${Math.min(255, c.b + a)})`; }
function darken(hex, a) { const c = hexRgb(hex); return `rgb(${Math.max(0, c.r - a)},${Math.max(0, c.g - a)},${Math.max(0, c.b - a)})`; }
function rgba(hex, alpha) { const c = hexRgb(hex); return `rgba(${c.r},${c.g},${c.b},${alpha})`; }
