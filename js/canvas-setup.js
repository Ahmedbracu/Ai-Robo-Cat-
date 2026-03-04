// ============================================================
//  CANVAS SETUP
// ============================================================
const canvas = document.getElementById('faceCanvas');
const ctx = canvas.getContext('2d');
const emotionLabel = document.getElementById('emotionLabel');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
