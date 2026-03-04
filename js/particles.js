// ============================================================
//  PARTICLES
// ============================================================
function initTears() {
    tearDrops = [];
    for (let i = 0; i < 8; i++)
        tearDrops.push({ side: i % 2 === 0 ? -1 : 1, vy: 1.5 + Math.random() * 2, delay: Math.random() * 30, life: 0 });
}
function initHearts() {
    heartParts = [];
    for (let i = 0; i < 6; i++)
        heartParts.push({ x: (Math.random() - 0.5) * 130, y: 0, vy: -0.6 - Math.random(), life: 0, maxL: 60 + Math.random() * 40, sz: 5 + Math.random() * 6 });
}
function initSparkles() {
    sparkles = [];
    for (let i = 0; i < 10; i++)
        sparkles.push({ angle: (Math.PI * 2 / 10) * i, dist: 55 + Math.random() * 35, sz: 2 + Math.random() * 3, spd: 0.015 + Math.random() * 0.02, life: 0 });
}
