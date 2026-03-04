
// ============================================================
//  DRAWING — MOUTHS
// ============================================================
function drawMouth(type, cx, my, s, color) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3 * s;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8 * s;

    switch (type) {
        case 'smile':
            ctx.beginPath();
            ctx.arc(cx, my - 8 * s, 16 * s, 0.15 * Math.PI, 0.85 * Math.PI, false);
            ctx.stroke();
            break;

        case 'bigSmile':
            ctx.beginPath();
            ctx.arc(cx, my - 3 * s, 20 * s, 0, Math.PI, false);
            ctx.fillStyle = darken(color, 70);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx - 18 * s, my - 3 * s);
            ctx.lineTo(cx + 18 * s, my - 3 * s);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5 * s;
            ctx.stroke();
            break;

        case 'cat':
            ctx.lineWidth = 2.5 * s;
            ctx.beginPath();
            ctx.arc(cx, my - 6 * s, 2.5 * s, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx - 16 * s, my - 2 * s);
            ctx.quadraticCurveTo(cx - 7 * s, my + 10 * s, cx, my + 2 * s);
            ctx.quadraticCurveTo(cx + 7 * s, my + 10 * s, cx + 16 * s, my - 2 * s);
            ctx.stroke();
            break;

        case 'catOpen':
            ctx.lineWidth = 2.5 * s;
            ctx.beginPath();
            ctx.arc(cx, my - 6 * s, 2.5 * s, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx - 18 * s, my - 2 * s);
            ctx.quadraticCurveTo(cx - 8 * s, my + 8 * s, cx, my + 2 * s);
            ctx.quadraticCurveTo(cx + 8 * s, my + 8 * s, cx + 18 * s, my - 2 * s);
            ctx.stroke();
            ctx.lineWidth = 3.5 * s;
            ctx.beginPath();
            ctx.moveTo(cx - 10 * s, my + 6 * s);
            ctx.bezierCurveTo(cx - 10 * s, my + 30 * s, cx + 10 * s, my + 30 * s, cx + 10 * s, my + 6 * s);
            ctx.stroke();
            break;

        case 'sad':
            ctx.beginPath();
            ctx.arc(cx, my + 8 * s, 14 * s, 1.2 * Math.PI, 1.8 * Math.PI, false);
            ctx.stroke();
            break;

        case 'flat':
            ctx.beginPath();
            ctx.moveTo(cx - 13 * s, my);
            ctx.lineTo(cx + 13 * s, my);
            ctx.stroke();
            break;

        case 'chevron':
            ctx.beginPath();
            ctx.moveTo(cx - 20 * s, my + 6 * s);
            ctx.lineTo(cx, my - 6 * s);
            ctx.lineTo(cx + 20 * s, my + 6 * s);
            ctx.stroke();
            break;

        case 'open':
            ctx.beginPath();
            ctx.ellipse(cx, my, 8 * s, 12 * s, 0, 0, Math.PI * 2);
            ctx.fillStyle = darken(color, 80);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2 * s;
            ctx.stroke();
            break;

        case 'tongue':
            ctx.beginPath();
            ctx.moveTo(cx - 13 * s, my);
            ctx.lineTo(cx + 13 * s, my);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(cx + 3 * s, my + 4 * s, 7 * s, 8 * s, 0, 0, Math.PI, false);
            ctx.fillStyle = '#ff5a6e';
            ctx.shadowColor = '#ff5a6e';
            ctx.fill();
            break;

        case 'teeth':
            ctx.lineWidth = 3.5 * s;
            ctx.beginPath();
            ctx.moveTo(cx - 15 * s, my);
            ctx.lineTo(cx + 15 * s, my);
            ctx.stroke();
            ctx.lineWidth = 1.5 * s;
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * 5.5 * s, my - 3 * s);
                ctx.lineTo(cx + i * 5.5 * s, my + 3 * s);
                ctx.stroke();
            }
            break;

        case 'tiny':
            ctx.beginPath();
            ctx.arc(cx, my, 3.5 * s, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 'wavy':
            ctx.lineWidth = 2.5 * s;
            ctx.beginPath();
            ctx.moveTo(cx - 14 * s, my);
            ctx.quadraticCurveTo(cx - 7 * s, my - 6 * s, cx, my);
            ctx.quadraticCurveTo(cx + 7 * s, my + 6 * s, cx + 14 * s, my);
            ctx.stroke();
            break;
    }
    ctx.shadowBlur = 0;
}
