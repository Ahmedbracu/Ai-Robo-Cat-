
// ============================================================
//  DRAWING — SPECIAL EFFECTS
// ============================================================
function drawSpecials(sp, cx, cy, s, color) {
    const c = hexRgb(color);

    if (sp === 'tears') {
        tearDrops.forEach(t => {
            t.life++;
            if (t.life < t.delay) return;
            const tx = cx + t.side * 46 * s;
            const ty = cy + 14 * s + (t.life - t.delay) * t.vy * s;
            const alpha = Math.max(0, 1 - (t.life - t.delay) / 55);
            if (alpha <= 0) { t.life = 0; return; }
            ctx.beginPath();
            ctx.moveTo(tx, ty - 4 * s);
            ctx.quadraticCurveTo(tx + 4 * s, ty, tx, ty + 5 * s);
            ctx.quadraticCurveTo(tx - 4 * s, ty, tx, ty - 4 * s);
            ctx.fillStyle = `rgba(100,200,255,${alpha * 0.65})`;
            ctx.fill();
        });
    }

    if (sp === 'hearts') {
        heartParts.forEach(h => {
            h.life++;
            h.y += h.vy * s;
            const alpha = Math.max(0, 1 - h.life / h.maxL);
            if (h.life > h.maxL) { h.life = 0; h.y = 0; h.x = (Math.random() - 0.5) * 130; }
            drawHeart(cx + h.x * s, cy + h.y * s - 40 * s, h.sz * s, `rgba(255,100,160,${alpha})`);
        });
    }

    if (sp === 'zzz') {
        const t = animT * 0.03;
        for (let i = 0; i < 3; i++) {
            const zx = cx + (55 + i * 14) * s;
            const zy = cy - (35 + i * 18) * s + Math.sin(t + i) * 5 * s;
            ctx.font = `bold ${(10 + i * 5) * s}px Outfit`;
            ctx.fillStyle = rgba(color, 0.15 + i * 0.15);
            ctx.textAlign = 'center';
            ctx.fillText('Z', zx, zy);
        }
        ctx.textAlign = 'start';
    }

    if (sp === 'question') {
        const qy = cy - 52 * s + Math.sin(animT * 0.05) * 4 * s;
        ctx.font = `bold ${20 * s}px Outfit`;
        ctx.fillStyle = rgba(color, 0.55);
        ctx.textAlign = 'center';
        ctx.fillText('?', cx + 52 * s, qy);
        ctx.textAlign = 'start';
    }

    if (sp === 'sweatDrop') {
        const sy = cy - 20 * s + Math.sin(animT * 0.05) * 8 * s;
        const sx = cx + 80 * s;
        ctx.beginPath();
        ctx.moveTo(sx, sy - 20 * s);
        ctx.quadraticCurveTo(sx + 18 * s, sy, sx, sy + 25 * s);
        ctx.quadraticCurveTo(sx - 18 * s, sy, sx, sy - 20 * s);
        ctx.fillStyle = `rgba(100,200,255,0.7)`;
        ctx.shadowColor = '#64c8ff';
        ctx.shadowBlur = 10 * s;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    if (sp === 'vein') {
        const vx = cx - 65 * s;
        const vy = cy - 70 * s;
        const pulse = 1 + Math.sin(animT * 0.2) * 0.15;
        ctx.save();
        ctx.translate(vx, vy);
        ctx.scale(pulse, pulse);
        ctx.strokeStyle = '#ff3b3b';
        ctx.lineWidth = 4 * s;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = '#ff3b3b';
        ctx.shadowBlur = 8 * s;
        ctx.beginPath();
        ctx.moveTo(-10 * s, -10 * s); ctx.lineTo(10 * s, 10 * s);
        ctx.moveTo(10 * s, -10 * s); ctx.lineTo(-10 * s, 10 * s);
        ctx.stroke();
        ctx.moveTo(-15 * s, 0); ctx.lineTo(15 * s, 0);
        ctx.moveTo(0, -15 * s); ctx.lineTo(0, 15 * s);
        ctx.stroke();
        ctx.restore();
    }

    if (sp === 'blush') {
        ctx.strokeStyle = 'rgba(255, 105, 180, 0.6)';
        ctx.lineWidth = 4 * s;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = 10 * s;
        for (let side = -1; side <= 1; side += 2) {
            const bx = cx + side * 60 * s;
            const by = cy + 15 * s;
            for (let i = -1; i <= 1; i++) {
                ctx.beginPath();
                ctx.moveTo(bx - 8 * s + i * 6 * s, by - 5 * s + i * 3 * s);
                ctx.lineTo(bx + 8 * s + i * 6 * s, by + 5 * s + i * 3 * s);
                ctx.stroke();
            }
        }
        ctx.shadowBlur = 0;
    }

    if (sp === 'dots') {
        for (let i = 0; i < 3; i++) {
            const bounce = Math.sin(animT * 0.08 + i * 0.8) * 4 * s;
            ctx.beginPath();
            ctx.arc(cx + (42 + i * 10) * s, cy - 44 * s + bounce, 3 * s, 0, Math.PI * 2);
            ctx.fillStyle = rgba(color, 0.25 + i * 0.18);
            ctx.fill();
        }
    }

    if (sp === 'sparkle') {
        sparkles.forEach(sp2 => {
            sp2.life++;
            sp2.angle += sp2.spd;
            const sx = cx + Math.cos(sp2.angle) * sp2.dist * s;
            const sy = cy + Math.sin(sp2.angle) * sp2.dist * s;
            const pulse = 0.6 + Math.sin(sp2.life * 0.12) * 0.4;
            drawStar4(sx, sy, sp2.sz * s * pulse, color);
        });
    }

    if (sp === 'soundWave') {
        for (let i = 0; i < 3; i++) {
            const r = (28 + i * 16) * s;
            const pulse = Math.sin(animT * 0.07 + i * 0.5) * 0.08;
            ctx.beginPath();
            ctx.arc(cx, cy, r, -0.35 + pulse, 0.35 + pulse, false);
            ctx.strokeStyle = rgba(color, 0.12 - i * 0.03);
            ctx.lineWidth = 2 * s;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r, Math.PI - 0.35 - pulse, Math.PI + 0.35 - pulse, false);
            ctx.stroke();
        }
    }

    if (sp === 'swirl') {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(animT * 0.04);
        for (let i = 0; i < 5; i++) {
            const a = (Math.PI * 2 / 5) * i;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * 60 * s, Math.sin(a) * 60 * s, 2.5 * s, 0, Math.PI * 2);
            ctx.fillStyle = rgba(color, 0.25);
            ctx.fill();
        }
        ctx.restore();
    }

    if (sp === 'thermometer') {
        ctx.save();
        ctx.translate(cx + 15 * s, cy + 30 * s);
        ctx.rotate(0.3);
        ctx.lineCap = 'round';
        ctx.lineWidth = 8 * s;
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(40 * s, 0); ctx.stroke();
        ctx.beginPath(); ctx.arc(43 * s, 0, 6 * s, 0, Math.PI * 2); ctx.fillStyle = '#ff4b72'; ctx.fill();
        ctx.lineWidth = 4 * s; ctx.strokeStyle = '#ff4b72';
        ctx.beginPath(); ctx.moveTo(20 * s, 0); ctx.lineTo(40 * s, 0); ctx.stroke();
        ctx.lineWidth = 2 * s; ctx.strokeStyle = '#000';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath(); ctx.moveTo((20 + i * 5) * s, -3 * s); ctx.lineTo((20 + i * 5) * s, 0); ctx.stroke();
        }
        ctx.restore();
    }

    if (sp === 'ghost') {
        const time = animT * 0.05;
        const gx = cx + 70 * s + Math.sin(time * 2) * 10 * s;
        const gy = cy - 80 * s - (animT % 200) * 0.5 * s;
        const alpha = Math.max(0, 1 - (animT % 200) / 200);
        ctx.save();
        ctx.translate(gx, gy);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10 * s;
        ctx.beginPath();
        ctx.arc(0, -10 * s, 15 * s, Math.PI, 0);
        ctx.lineTo(15 * s, 20 * s);
        ctx.lineTo(5 * s, 15 * s);
        ctx.lineTo(-5 * s, 20 * s);
        ctx.lineTo(-15 * s, 15 * s);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.beginPath(); ctx.arc(-5 * s, -10 * s, 2 * s, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(5 * s, -10 * s, 2 * s, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    if (sp === 'food') {
        const chew = Math.abs(Math.sin(animT * 0.15)) * 14 * s;
        ctx.fillStyle = rgba(color, 0.4);
        ctx.shadowColor = color;
        ctx.shadowBlur = 10 * s;
        ctx.beginPath(); ctx.arc(cx - (70 * s + chew), cy + 40 * s, 20 * s + chew, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx + (70 * s + chew), cy + 40 * s, 20 * s + chew, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
    }

    if (sp === 'drops') {
        for (let i = 0; i < 4; i++) {
            const dropY = (animT * 2 + i * 20) % 60;
            ctx.beginPath();
            ctx.arc(cx + (i - 1.5) * 20 * s, cy + 30 * s + dropY * s, 3 * s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${1 - dropY / 60})`;
            ctx.fill();
        }
    }

    if (sp === 'toast') {
        ctx.save();
        ctx.translate(cx, cy + 35 * s);
        ctx.rotate(-0.1);
        ctx.fillStyle = '#c88645';
        ctx.beginPath();
        ctx.moveTo(-25 * s, -15 * s);
        ctx.arc(-12 * s, -15 * s, 14 * s, Math.PI, 0);
        ctx.arc(12 * s, -15 * s, 14 * s, Math.PI, 0);
        ctx.lineTo(25 * s, 20 * s);
        ctx.lineTo(-25 * s, 20 * s);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fdebd3';
        ctx.beginPath();
        ctx.moveTo(-21 * s, -12 * s);
        ctx.arc(-12 * s, -13 * s, 10 * s, Math.PI, 0);
        ctx.arc(12 * s, -13 * s, 10 * s, Math.PI, 0);
        ctx.lineTo(21 * s, 17 * s);
        ctx.lineTo(-21 * s, 17 * s);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    if (sp === 'nightcap') {
        ctx.save();
        ctx.translate(cx, cy - 88 * s);

        // The floppy tail (blue)
        ctx.fillStyle = '#3b6aebff';
        ctx.shadowColor = '#3b6aebff';
        ctx.shadowBlur = 11 * s;
        ctx.beginPath();
        ctx.moveTo(-99 * s, -11 * s);
        // Curve up and over to the left, then down
        ctx.bezierCurveTo(-165 * s, -99 * s, -154 * s, 88 * s, -121 * s, 88 * s);
        // Curve back to the rim
        ctx.bezierCurveTo(-121 * s, 11 * s, -66 * s, 11 * s, 11 * s, -44 * s);
        ctx.fill();

        // The main dome of the hat (blue)
        ctx.beginPath();
        ctx.moveTo(-110 * s, -11 * s);
        ctx.bezierCurveTo(-99 * s, -132 * s, 110 * s, -121 * s, 110 * s, 0 * s);
        ctx.quadraticCurveTo(0 * s, 11 * s, -110 * s, -11 * s);
        ctx.fill();

        // The thick white rim
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 13.2 * s;
        ctx.beginPath();
        ctx.moveTo(-115.5 * s, 0);
        ctx.quadraticCurveTo(-126.5 * s, -22 * s, -110 * s, -33 * s);
        ctx.quadraticCurveTo(0 * s, -38.5 * s, 110 * s, -22 * s);
        ctx.quadraticCurveTo(126.5 * s, -5.5 * s, 115.5 * s, 16.5 * s);
        ctx.quadraticCurveTo(0 * s, 16.5 * s, -115.5 * s, 0);
        ctx.fill();

        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 3.3 * s;
        ctx.beginPath();
        ctx.moveTo(-110 * s, -16.5 * s);
        ctx.quadraticCurveTo(0 * s, -22 * s, 104.5 * s, -5.5 * s);
        ctx.stroke();

        // The white pom-pom
        ctx.beginPath();
        ctx.arc(-132 * s, 99 * s, 24.2 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    if (sp === 'bedhead') {
        ctx.save();
        ctx.translate(cx, cy - 100 * s);
        ctx.strokeStyle = color;
        ctx.lineWidth = 6 * s;
        ctx.lineCap = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = 10 * s;
        ctx.beginPath(); ctx.moveTo(-10 * s, 15 * s); ctx.quadraticCurveTo(-25 * s, -10 * s, -30 * s, -5 * s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(5 * s, 10 * s); ctx.quadraticCurveTo(5 * s, -25 * s, 15 * s, -30 * s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20 * s, 13 * s); ctx.quadraticCurveTo(35 * s, -5 * s, 45 * s, 5 * s); ctx.stroke();
        ctx.restore();
    }

    if (sp === 'battery_low') {
        ctx.save();
        ctx.translate(cx, cy - 90 * s);
        ctx.strokeStyle = '#ff3b3b';
        ctx.lineWidth = 4 * s;
        ctx.shadowColor = '#ff3b3b';
        ctx.shadowBlur = 10 * s;
        ctx.strokeRect(-20 * s, -10 * s, 40 * s, 20 * s);
        ctx.fillRect(20 * s, -4 * s, 4 * s, 8 * s);
        if (animT % 30 < 15) {
            ctx.fillStyle = '#ff3b3b';
            ctx.fillRect(-16 * s, -6 * s, 8 * s, 12 * s);
        }
        ctx.restore();
        breathOff = Math.sin(animT * 0.4) * 8 * s;
    }

    if (sp === 'battery_charge') {
        ctx.save();
        ctx.translate(cx, cy - 90 * s);
        ctx.strokeStyle = '#39ff14';
        ctx.lineWidth = 4 * s;
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 10 * s;
        ctx.strokeRect(-20 * s, -10 * s, 40 * s, 20 * s);
        ctx.fillRect(20 * s, -4 * s, 4 * s, 8 * s);
        ctx.fillStyle = '#39ff14';
        ctx.beginPath(); ctx.moveTo(-2 * s, -8 * s); ctx.lineTo(-8 * s, 2 * s); ctx.lineTo(-2 * s, 2 * s);
        ctx.lineTo(-2 * s, 8 * s); ctx.lineTo(6 * s, -2 * s); ctx.lineTo(0, -2 * s); ctx.closePath(); ctx.fill();
        ctx.restore();
        ctx.beginPath(); ctx.ellipse(cx, cy, 140 * s, 120 * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${0.1 + Math.sin(animT * 0.1) * 0.05})`; ctx.fill();
    }

    if (sp === 'hot') {
        ctx.beginPath(); ctx.ellipse(cx, cy, 140 * s, 120 * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 59, 59, 0.2)`; ctx.fill();
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)'; ctx.shadowColor = '#64c8ff'; ctx.shadowBlur = 10 * s;
        ctx.beginPath();
        const sx = cx + 80 * s;
        const sy = cy - 20 * s + Math.sin(animT * 0.1) * 15 * s;
        ctx.moveTo(sx, sy - 20 * s); ctx.quadraticCurveTo(sx + 18 * s, sy, sx, sy + 25 * s);
        ctx.quadraticCurveTo(sx - 18 * s, sy, sx, sy - 20 * s); ctx.fill(); ctx.shadowBlur = 0;
    }

    if (sp === 'snow') {
        ctx.beginPath(); ctx.ellipse(cx, cy, 140 * s, 120 * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, 0.25)`; ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#ffffff'; ctx.shadowBlur = 8 * s;
        ctx.font = `${30 * s}px sans-serif`;
        for (let i = 0; i < 4; i++) {
            const snX = cx + Math.sin(animT * 0.02 + i) * 100 * s;
            const snY = cy - 100 * s + ((animT * 0.5 + i * 50) % 200) * s;
            ctx.fillText('\u2744', snX, snY);
        }
        ctx.shadowBlur = 0;
    }

    if (sp === 'umbrella') {
        ctx.save();
        ctx.translate(cx + 40 * s, cy - 100 * s);
        ctx.rotate(0.2);
        ctx.strokeStyle = '#c88645'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 140 * s); ctx.stroke();
        ctx.fillStyle = '#ff4b72'; ctx.beginPath();
        ctx.arc(0, 0, 80 * s, Math.PI, 0); ctx.fill();
        ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
        for (let i = 0; i < 6; i++) {
            const rx = -150 * s + ((i * 50 + animT * 5) % 300) * s;
            const ry = -50 * s + ((i * 40 + animT * 8) % 250) * s;
            ctx.fillRect(rx, ry, 2 * s, 15 * s);
        }
        ctx.restore();
    }

    if (sp === 'windLines') {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
        for (let i = 0; i < 5; i++) {
            const wx = cx - 200 * s + ((animT * 15 + i * 80) % 400) * s;
            const wy = cy - 80 * s + i * 40 * s;
            ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 60 * s, wy); ctx.stroke();
        }
    }

    if (sp === 'sunglasses') {
        ctx.save();
        ctx.translate(cx, cy - 5 * s);
        ctx.fillStyle = '#111111'; ctx.shadowColor = 'black'; ctx.shadowBlur = 10 * s;
        ctx.beginPath(); ctx.moveTo(-80 * s, -20 * s); ctx.quadraticCurveTo(-45 * s, -20 * s, -20 * s, -15 * s);
        ctx.quadraticCurveTo(-20 * s, 25 * s, -45 * s, 30 * s); ctx.quadraticCurveTo(-80 * s, 25 * s, -80 * s, -20 * s); ctx.fill();
        ctx.beginPath(); ctx.moveTo(20 * s, -15 * s); ctx.quadraticCurveTo(45 * s, -20 * s, 80 * s, -20 * s);
        ctx.quadraticCurveTo(80 * s, 25 * s, 45 * s, 30 * s); ctx.quadraticCurveTo(20 * s, 25 * s, 20 * s, -15 * s); ctx.fill();
        ctx.strokeStyle = '#111111'; ctx.lineWidth = 6 * s;
        ctx.beginPath(); ctx.moveTo(-20 * s, -10 * s); ctx.quadraticCurveTo(0, -15 * s, 20 * s, -10 * s); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.ellipse(-55 * s, 0, 15 * s, 5 * s, -0.4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    if (sp === 'straw') {
        ctx.save();
        ctx.translate(cx, cy + 30 * s);
        ctx.fillStyle = '#ff9100'; ctx.beginPath();
        ctx.moveTo(-15 * s, 40 * s); ctx.lineTo(15 * s, 40 * s); ctx.lineTo(20 * s, 0); ctx.lineTo(-20 * s, 0); ctx.fill();
        ctx.strokeStyle = '#39ff14'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(5 * s, 10 * s); ctx.lineTo(20 * s, -25 * s); ctx.lineTo(0 * s, -25 * s); ctx.stroke();
        ctx.restore();
    }

    if (sp === 'musicNotes') {
        ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 10 * s;
        ctx.font = `${36 * s}px sans-serif`;
        for (let i = 0; i < 3; i++) {
            let mY = cy - 80 * s + Math.sin(animT * 0.05 + i) * 20 * s;
            let mX = cx + (i === 1 ? 80 * s : -90 * s + i * 20 * s);
            ctx.fillText('\u266B', mX, mY);
        }
        ctx.shadowBlur = 0;
    }

    if (sp === 'glasses') {
        ctx.save();
        ctx.translate(cx, cy - 5 * s);
        ctx.strokeStyle = color; ctx.lineWidth = 4 * s; ctx.shadowColor = color; ctx.shadowBlur = 8 * s;
        ctx.strokeRect(-75 * s, -25 * s, 60 * s, 50 * s);
        ctx.strokeRect(15 * s, -25 * s, 60 * s, 50 * s);
        ctx.beginPath(); ctx.moveTo(-15 * s, -10 * s); ctx.quadraticCurveTo(0, -20 * s, 15 * s, -10 * s); ctx.stroke();
        ctx.restore();
    }

    if (sp === 'sweatband') {
        ctx.save();
        ctx.translate(cx, cy - 60 * s);
        ctx.fillStyle = '#ff3b3b'; ctx.shadowColor = '#ff3b3b'; ctx.shadowBlur = 10 * s;
        ctx.beginPath(); ctx.ellipse(0, 0, 95 * s, 15 * s, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0;
        ctx.fillRect(-15 * s, -5 * s, 30 * s, 10 * s);
        ctx.restore();
    }

    if (sp === 'tear_single') {
        const ty = cy + 20 * s + (animT % 100) * s * 0.5;
        const alpha = Math.max(0, 1 - (animT % 100) / 100);
        ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
        ctx.beginPath(); ctx.arc(cx + 60 * s, ty, 6 * s, 0, Math.PI * 2); ctx.fill();
    }

    if (sp === 'dance_lines') {
        ctx.strokeStyle = color; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
        const pulse = Math.sin(animT * 0.2) > 0 ? 10 * s : 0;
        ctx.beginPath(); ctx.arc(cx - 110 * s - pulse, cy, 30 * s, 0.4, 2.7, false); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 110 * s + pulse, cy, 30 * s, Math.PI + 0.4, Math.PI + 2.7, false); ctx.stroke();
    }
}

function drawHeart(x, y, sz, color) {
    ctx.save();
    ctx.translate(x, y);
    const f = sz / 10;
    ctx.scale(f, f);
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.bezierCurveTo(-5, -3, -10, 0, -10, 5);
    ctx.bezierCurveTo(-10, 12, 0, 16, 0, 20);
    ctx.bezierCurveTo(0, 16, 10, 12, 10, 5);
    ctx.bezierCurveTo(10, 0, 5, -3, 0, 3);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

function drawStar4(x, y, r, color) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        const d = i % 2 === 0 ? r : r * 0.3;
        const a = (Math.PI / 4) * i;
        const px = x + Math.cos(a) * d;
        const py = y + Math.sin(a) * d;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}
