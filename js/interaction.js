// ============================================================
//  INTERACTION
// ============================================================
let ptrDown = 0;
window.addEventListener('pointerdown', e => {
    if (e.target.closest('#colorBar')) return;
    ptrDown = Date.now();
});
window.addEventListener('pointerup', e => {
    if (e.target.closest('#colorBar')) return;
    const d = Date.now() - ptrDown;
    if (d > 400) setEmotion('cuddle', 4);
    else setEmotion('cry', 3);
});

const KEYMAP = {
    '1': 'happy', '2': 'cuddle', '3': 'cry', '4': 'angry', '5': 'sleepy',
    '6': 'surprised', '7': 'confused', '8': 'scared', '9': 'laughing',
    '0': 'winking', 'q': 'thinking', 'w': 'annoyed', 'e': 'excited',
    'r': 'sick', 't': 'cheeky', 'y': 'suspicious', 'u': 'listening',
    'i': 'dizzy', 'o': 'bored'
};
window.addEventListener('keydown', e => {
    const em = KEYMAP[e.key.toLowerCase()];
    if (em) setEmotion(em, 3);
});
