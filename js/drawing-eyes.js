
// ============================================================
//  DRAWING — EYES  (with pupil tracking)
// ============================================================

function drawOvalEye(x, y, w, h, s, color, blink) {
    const bh = h * blink;
    if (bh < 2 * s) { drawFlatEye(x, y, w * 2, 3 * s, s, color); return; }
    const gc = hexRgb(color);
    const gg = ctx.createRadialGradient(x, y, 0, x, y, w * 1.6);
    gg.addColorStop(0, `rgba(${gc.r},${gc.g},${gc.b},0.25)`);
    gg.addColorStop(0.5, `rgba(${gc.r},${gc.g},${gc.b},0.06)`);
    gg.addColorStop(1, `rgba(${gc.r},${gc.g},${gc.b},0)`);
    ctx.beginPath();
    ctx.ellipse(x, y, w * 1.6, bh * 1.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = gg;
    ctx.fill();
    const eg = ctx.createRadialGradient(x, y - bh * 0.2, 0, x, y, Math.max(w, bh) * 0.85);
    eg.addColorStop(0, lighten(color, 50));
    eg.addColorStop(0.5, color);
    eg.addColorStop(1, darken(color, 40));
    ctx.beginPath();
    ctx.ellipse(x, y, w, bh, 0, 0, Math.PI * 2);
    ctx.fillStyle = eg;
    ctx.fill();
    const pup = getPupilOffset(x, y, w, bh, s);
    const pupR = Math.min(w, bh) * 0.38;
    ctx.beginPath();
    ctx.ellipse(x + pup.px, y + pup.py, pupR, pupR * (bh / Math.max(h, 1)), 0, 0, Math.PI * 2);
    ctx.fillStyle = darken(color, 90);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - w * 0.22 + pup.px * 0.3, y - bh * 0.22 + pup.py * 0.3, w * 0.18, bh * 0.16, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.15 + pup.px * 0.2, y + bh * 0.15 + pup.py * 0.2, w * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();
}

function drawRoundEye(x, y, r, s, color, blink) {
    const br = r * blink;
    if (br < 2 * s) { drawFlatEye(x, y, r * 2, 3 * s, s, color); return; }
    drawOvalEye(x, y, r, br, s, color, 1);
}

function drawHappyEye(x, y, w, h, s, color) {
    ctx.lineCap = 'round';
    ctx.lineWidth = h * 1.1;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16 * s;
    ctx.beginPath();
    ctx.arc(x, y + h * 0.8, w * 0.45, Math.PI, 0, false);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawAngryEye(x, y, w, h, s, color, isLeft, blink) {
    const bh = h * blink;
    if (bh < 2 * s) { drawFlatEye(x, y, w * 2, 3 * s, s, color); return; }
    ctx.lineCap = 'round';
    ctx.lineWidth = 11 * s;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15 * s;
    const r = w * 0.55;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (bh / h), 0, 0, Math.PI * 2);
    ctx.stroke();
    const browY = y - r * 1.5 - 6 * s;
    const browX = x + (isLeft ? 8 * s : -8 * s);
    ctx.beginPath();
    if (isLeft) {
        ctx.moveTo(browX - 12 * s, browY - 12 * s);
        ctx.lineTo(browX + 16 * s, browY + 8 * s);
    } else {
        ctx.moveTo(browX + 12 * s, browY - 12 * s);
        ctx.lineTo(browX - 16 * s, browY + 8 * s);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawCuriousEye(x, y, r, s, color, isLeft, blink) {
    const br = r * blink;
    if (br < 2 * s) { drawFlatEye(x, y, r * 2, 3 * s, s, color); return; }
    ctx.lineCap = 'round';
    ctx.lineWidth = 9 * s;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * s;
    ctx.beginPath();
    ctx.ellipse(x, y, r, br, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - br * 0.3, r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r * 0.4, y + br * 0.4, r * 0.1, 0, Math.PI * 2);
    ctx.fill();
    const browY = y - r * 1.6;
    ctx.beginPath();
    ctx.moveTo(x - 12 * s, browY + 6 * s);
    ctx.quadraticCurveTo(x, browY - 4 * s, x + 12 * s, browY + 6 * s);
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawPleadingEye(x, y, r, s, color, blink) {
    const br = r * blink;
    if (br < 2 * s) { drawFlatEye(x, y, r * 2, 3 * s, s, color); return; }
    ctx.beginPath();
    ctx.ellipse(x, y, r, br, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15 * s;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.ellipse(x - r * 0.2, y - br * 0.3, r * 0.4, br * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + r * 0.3, y + br * 0.3, r * 0.15, br * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
}

function drawSneezeEye(x, y, r, s, color, isLeft) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10 * s;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * s;
    ctx.beginPath();
    if (isLeft) {
        ctx.moveTo(x - r * 0.6, y - r * 0.6);
        ctx.lineTo(x + r * 0.6, y);
        ctx.lineTo(x - r * 0.6, y + r * 0.6);
    } else {
        ctx.moveTo(x + r * 0.6, y - r * 0.6);
        ctx.lineTo(x - r * 0.6, y);
        ctx.lineTo(x + r * 0.6, y + r * 0.6);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawSadEye(x, y, w, h, s, color, isLeft, blink) {
    const bh = h * blink;
    if (bh < 2 * s) { drawFlatEye(x, y, w * 2, 3 * s, s, color); return; }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(isLeft ? -0.18 : 0.18);
    drawOvalEye(0, 0, w, bh, s, color, 1);
    ctx.restore();
}

function drawFlatEye(x, y, w, h, s, color) {
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(h, 3.5 * s);
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * s;
    ctx.beginPath();
    ctx.moveTo(x - w * 0.45, y);
    ctx.lineTo(x + w * 0.45, y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawCrossEye(x, y, r, s, color) {
    ctx.lineCap = 'round';
    ctx.lineWidth = 4.5 * s;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * s;
    ctx.strokeStyle = color;
    const d = r * 0.45;
    ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x + d, y + d); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + d, y - d); ctx.lineTo(x - d, y + d); ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawStarEye(x, y, r, s, color) {
    const spikes = 5, outerR = r, innerR = r * 0.4;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14 * s;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
        const rad = i % 2 === 0 ? outerR : innerR;
        const a = (Math.PI / spikes) * i - Math.PI / 2 + animT * 0.02;
        const px = x + Math.cos(a) * rad;
        const py = y + Math.sin(a) * rad;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(x - r * 0.15, y - r * 0.2, r * 0.14, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fill();
}
