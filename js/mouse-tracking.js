// ============================================================
//  MOUSE / TOUCH TRACKING  (the "cat watching you" effect)
// ============================================================
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let smoothMouseX = mouseX;
let smoothMouseY = mouseY;

let mouseVelocity = 0;
let lastMouseObj = { x: mouseX, y: mouseY, time: Date.now() };

// Touch interaction states
let isTouching = false;
let tickleScore = 0;

// "Poke" reaction
window.addEventListener('mousedown', (e) => handlePoke(e.clientX, e.clientY));
window.addEventListener('touchstart', (e) => {
    isTouching = true;
    if (e.touches.length > 0) handlePoke(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });
window.addEventListener('mouseup', () => isTouching = false);
window.addEventListener('touchend', () => isTouching = false);

function handlePoke(x, y) {
    mouseX = x; mouseY = y;
    // Instantly snap smooth mouse to cursor to "look" exactly there
    smoothMouseX = x; smoothMouseY = y;
    setEmotion('annoyed', 2);
}

window.addEventListener('mousemove', e => {
    handleMove(e.clientX, e.clientY);
});
window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

function handleMove(x, y) {
    const now = Date.now();
    const dt = now - lastMouseObj.time;
    if (dt > 0) {
        const dist = Math.hypot(x - lastMouseObj.x, y - lastMouseObj.y);
        const v = dist / dt;
        mouseVelocity = mouseVelocity * 0.8 + v * 0.2; // Smooth velocity

        // Shake dizzy logic
        if (mouseVelocity > 2.5 && currentEmotion !== 'dizzy') {
            setEmotion('dizzy', 4);
            mouseVelocity = 0; // Reset
        }

        // Tickle logic (dragging fast while touching/clicking)
        if (isTouching && mouseVelocity > 0.5 && currentEmotion !== 'laughing') {
            tickleScore += v;
            if (tickleScore > 50) {
                setEmotion('laughing', 3);
                tickleScore = 0;
            }
        }
    }
    lastMouseObj.x = x;
    lastMouseObj.y = y;
    lastMouseObj.time = now;

    mouseX = x;
    mouseY = y;
}

// Smooth interpolation for silky eye tracking
function updateSmoothMouse() {
    const lerp = 0.08;
    smoothMouseX += (mouseX - smoothMouseX) * lerp;
    smoothMouseY += (mouseY - smoothMouseY) * lerp;

    // Dizziness decay
    mouseVelocity *= 0.95;
}
