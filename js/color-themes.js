// ============================================================
//  COLOR THEMES (7 Colors)
// ============================================================
const COLOR_THEMES = [
    { name: 'Cyan', primary: '#00e5ff', glow: 'rgba(0,229,255,0.4)', bg: '#060810' },
    { name: 'Pink', primary: '#ff6eb4', glow: 'rgba(255,110,180,0.4)', bg: '#0c070a' },
    { name: 'Green', primary: '#39ff14', glow: 'rgba(57,255,20,0.4)', bg: '#060c06' },
    { name: 'Purple', primary: '#bf5fff', glow: 'rgba(191,95,255,0.4)', bg: '#09060c' },
    { name: 'Orange', primary: '#ff9100', glow: 'rgba(255,145,0,0.4)', bg: '#0c0a06' },
    { name: 'White', primary: '#d8dce8', glow: 'rgba(216,220,232,0.3)', bg: '#08080a' },
    { name: 'Red', primary: '#ff3b3b', glow: 'rgba(255,59,59,0.4)', bg: '#0c0606' },
];

let themeIdx = 0;
let col = COLOR_THEMES[0].primary;
let glowCol = COLOR_THEMES[0].glow;

const colorBar = document.getElementById('colorBar');
COLOR_THEMES.forEach((t, i) => {
    const d = document.createElement('div');
    d.className = 'colorDot' + (i === 0 ? ' active' : '');
    d.style.background = t.primary;
    d.style.color = t.primary;
    d.addEventListener('click', () => {
        document.querySelectorAll('.colorDot').forEach(x => x.classList.remove('active'));
        d.classList.add('active');
        themeIdx = i; col = t.primary; glowCol = t.glow;
        document.body.style.background = t.bg;
    });
    colorBar.appendChild(d);
});
