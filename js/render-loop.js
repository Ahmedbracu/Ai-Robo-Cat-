// ============================================================
//  MAIN RENDER LOOP
// ============================================================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animT++;
    updateSmoothMouse();

    // Revert to time-based default emotion
    const baseEmo = getBaseTimeEmotion();
    if (Date.now() > emotionEndTime && currentEmotion !== baseEmo) {
        currentEmotion = baseEmo;
        emotionLabel.textContent = currentEmotion.toUpperCase();
    }

    // Blinking (smooth)
    if (!isBlinking && Math.random() < 0.007) {
        isBlinking = true;
        blinkTimer = 12;
    }
    if (isBlinking) {
        blinkTimer--;
        if (blinkTimer <= 0) isBlinking = false;
    }
    // Smooth blink height 0..1
    const blinkTarget = isBlinking ? 0.05 : 1;
    blinkH += (blinkTarget - blinkH) * 0.3;

    // Scale
    const minDim = Math.min(canvas.width, canvas.height);
    const s = minDim / 340;

    const cfg = EMOTIONS[currentEmotion];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Breathing
    breathTimer += 0.04;
    let breathOff = Math.sin(breathTimer) * 4 * s;

    // Apply environment/action offsets
    let hTiltXAdd = 0;
    let hTiltYAdd = 0;

    if (currentEmotion === 'hiding') hTiltYAdd += 130 * s;
    if (currentEmotion === 'workout') breathOff = Math.sin(animT * 0.35) * 15 * s; // Fast breathing
    if (currentEmotion === 'hot') breathOff = Math.sin(animT * 0.25) * 10 * s;
    if (currentEmotion === 'dancing') {
        hTiltXAdd += Math.sin(animT * 0.1) * 30 * s;
        hTiltYAdd += Math.abs(Math.sin(animT * 0.2)) * 10 * s;
    }
    if (currentEmotion === 'cold') {
        hTiltXAdd += (Math.random() - 0.5) * 6 * s; // shivering
        hTiltYAdd += (Math.random() - 0.5) * 6 * s;
    }
    if (currentEmotion === 'windy') {
        hTiltXAdd += 50 * s; // blown to the right
    }

    const baseY = cy + cfg.yOff * s + breathOff;

    // Slight head tilt toward cursor
    let headTiltX = (smoothMouseX - cx) * 0.012 + hTiltXAdd;
    let headTiltY = (smoothMouseY - cy) * 0.008 + hTiltYAdd;

    // Smooth ear angles toward targets
    const earLerp = 0.08;
    let targetEarL = cfg.earL;
    let targetEarR = cfg.earR;
    if (currentEmotion === 'windy') { targetEarL -= 0.6; targetEarR -= 0.6; } // Blown right

    smoothEarL += (targetEarL - smoothEarL) * earLerp;
    smoothEarR += (targetEarR - smoothEarR) * earLerp;
    smoothWDroop += (cfg.wDroop - smoothWDroop) * earLerp;

    // Add subtle ear twitch
    const earTwitch = Math.sin(animT * 0.06) * 0.03;

    const headCX = cx + headTiltX;
    const headCY = cy + breathOff * 0.3 + headTiltY;

    // 1. Cat ears (drawn BEHIND the head)
    drawCatEars(headCX, headCY, s, col,
        smoothEarL + earTwitch,
        smoothEarR - earTwitch
    );

    // 2. Head
    drawHead(headCX, headCY, s);

    // Eye positions
    const gap = cfg.gap * s;
    const leftX = cx - gap / 2 + headTiltX;
    const rightX = cx + gap / 2 + headTiltX;
    const eyeBaseY = baseY + headTiltY;

    const ew = cfg.ew * s;
    const eh = cfg.eh * s;

    // 3. Draw eyes based on type
    const isWink = cfg.sp === 'wink';

    switch (cfg.eyeType) {
        case 'oval':
            drawOvalEye(leftX, eyeBaseY, ew / 2, eh / 2, s, col, blinkH);
            if (isWink) drawHappyEye(rightX, eyeBaseY, ew, eh * 0.4, s, col);
            else drawOvalEye(rightX, eyeBaseY, ew / 2, eh / 2, s, col, blinkH);
            break;
        case 'happy':
            drawHappyEye(leftX, eyeBaseY, ew, eh, s, col);
            drawHappyEye(rightX, eyeBaseY, ew, eh, s, col);
            break;
        case 'angry':
            drawAngryEye(leftX, eyeBaseY, ew / 2, eh / 2, s, col, true, blinkH);
            drawAngryEye(rightX, eyeBaseY, ew / 2, eh / 2, s, col, false, blinkH);
            break;
        case 'sad':
            drawSadEye(leftX, eyeBaseY, ew / 2, eh / 2, s, col, true, blinkH);
            drawSadEye(rightX, eyeBaseY, ew / 2, eh / 2, s, col, false, blinkH);
            break;
        case 'round':
            drawRoundEye(leftX, eyeBaseY, ew / 2, s, col, blinkH);
            drawRoundEye(rightX, eyeBaseY, ew / 2, s, col, blinkH);
            break;
        case 'flat':
            drawFlatEye(leftX, eyeBaseY, ew, eh, s, col);
            drawFlatEye(rightX, eyeBaseY, ew, eh, s, col);
            break;
        case 'cross':
            drawCrossEye(leftX, eyeBaseY, ew, s, col);
            drawCrossEye(rightX, eyeBaseY, ew, s, col);
            break;
        case 'star':
            drawStarEye(leftX, eyeBaseY, ew / 2, s, col);
            drawStarEye(rightX, eyeBaseY, ew / 2, s, col);
            break;
        case 'heart':
            const pulse = 1 + Math.sin(animT * 0.1) * 0.1;
            drawHeart(leftX, eyeBaseY, ew * pulse, '#ff4b72');
            drawHeart(rightX, eyeBaseY, ew * pulse, '#ff4b72');
            break;
        case 'curious':
            drawCuriousEye(leftX, eyeBaseY, ew / 2, s, col, true, blinkH);
            drawCuriousEye(rightX, eyeBaseY, ew / 2, s, col, false, blinkH);
            break;
        case 'pleading':
            drawPleadingEye(leftX, eyeBaseY, ew / 2, s, col, blinkH);
            drawPleadingEye(rightX, eyeBaseY, ew / 2, s, col, blinkH);
            break;
        case 'sneeze':
            drawSneezeEye(leftX, eyeBaseY, ew / 2, s, col, true);
            drawSneezeEye(rightX, eyeBaseY, ew / 2, s, col, false);
            break;
    }

    // 4. Mouth
    if (cfg.mouth !== 'none') {
        drawMouth(cfg.mouth, cx + headTiltX, eyeBaseY + 36 * s, s, col);
    }

    // 5. Whiskers (drawn OVER the face, below the eyes)
    drawWhiskers(cx + headTiltX, eyeBaseY, s, col, smoothWDroop);

    // 6. Specials
    if (cfg.sp) drawSpecials(cfg.sp, cx + headTiltX, eyeBaseY, s, col);

    requestAnimationFrame(draw);
}

draw();
