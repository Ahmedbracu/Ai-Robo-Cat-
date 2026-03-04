// ============================================================
//  COMPUTE PUPIL OFFSET  (eye tracking logic)
// ============================================================
function getPupilOffset(eyeX, eyeY, eyeW, eyeH, s) {
    const dx = smoothMouseX - eyeX;
    const dy = smoothMouseY - eyeY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return { px: 0, py: 0 };
    const maxShiftX = eyeW * 0.22;
    const maxShiftY = eyeH * 0.22;
    const factor = Math.min(1, dist / (280 * s));
    return {
        px: (dx / dist) * maxShiftX * factor,
        py: (dy / dist) * maxShiftY * factor
    };
}

// ============================================================
//  DRAWING — CAT EARS
// ============================================================
function drawCatEar(cx, cy, s, color, angle, isLeft) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(isLeft ? -angle : angle);
    const earW = 45 * s;
    const earH = 55 * s;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 9 * s;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * s;
    ctx.beginPath();
    ctx.moveTo(-earW / 2, 0);
    ctx.quadraticCurveTo(-earW * 0.1, -earH * 0.9, 0, -earH);
    ctx.quadraticCurveTo(earW * 0.1, -earH * 0.9, earW / 2, 0);
    ctx.stroke();
    ctx.restore();
}

function drawCatEars(cx, cy, s, color, earLAngle, earRAngle) {
    const hw = 125 * s;
    const hh = 105 * s;
    const earSpread = hw * 0.62;
    const earBaseY = cy - hh * 0.72;
    drawCatEar(cx - earSpread, earBaseY, s, color, earLAngle, true);
    drawCatEar(cx + earSpread, earBaseY, s, color, earRAngle, false);
}

// ============================================================
//  DRAWING — WHISKERS
// ============================================================
function drawWhiskers(cx, cy, s, color, droop) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = 9 * s;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * s;
    const baseOffX = 70 * s;
    const baseOffY = 32 * s;
    const lenX = 35 * s;
    const spacingY = 24 * s;
    for (let side = -1; side <= 1; side += 2) {
        const tBaseAngle = -0.15;
        const tAng = (side === 1 ? tBaseAngle : Math.PI - tBaseAngle) + (side * droop * 0.4);
        const tx = cx + side * baseOffX;
        const ty = cy + baseOffY - spacingY / 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + lenX * Math.cos(tAng), ty + lenX * Math.sin(tAng));
        ctx.stroke();
        const bBaseAngle = 0.15;
        const bAng = (side === 1 ? bBaseAngle : Math.PI - bBaseAngle) + (side * droop * 0.4);
        const bx = cx + side * baseOffX;
        const by = cy + baseOffY + spacingY / 2;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + lenX * Math.cos(bAng), by + lenX * Math.sin(bAng));
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy + 22 * s, 6 * s, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

// ============================================================
//  DRAWING — HEAD
// ============================================================
function drawHead(cx, cy, s) {
    const hw = 125 * s;
    const hh = 105 * s;
    const g = ctx.createRadialGradient(cx, cy - 12 * s, 10 * s, cx, cy + 5 * s, hw * 1.05);
    g.addColorStop(0, '#191920');
    g.addColorStop(0.65, '#111117');
    g.addColorStop(1, '#08080e');
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1.5 * s;
    ctx.stroke();
}
