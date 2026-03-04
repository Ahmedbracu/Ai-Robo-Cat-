// ============================================================
//  20 EMOTIONS
// ============================================================
//  eyeType: 'oval','happy','angry','sad','round','flat','cross','star'
//  mouth:   'none','smile','bigSmile','cat','sad','flat','open','tongue','teeth','tiny','wavy'
const EMOTIONS = {
    //                                                           earL  earR  wDroop  sound
    neutral: { eyeType: 'oval', ew: 50, eh: 40, gap: 90, mouth: 'none', yOff: 0, sp: null, earL: 0, earR: 0, wDroop: 0, snd: null },
    happy: { eyeType: 'happy', ew: 50, eh: 20, gap: 88, mouth: 'smile', yOff: -8, sp: null, earL: 0.15, earR: 0.15, wDroop: -0.1, snd: 'purr' },
    cuddle: { eyeType: 'oval', ew: 56, eh: 34, gap: 76, mouth: 'cat', yOff: -4, sp: 'hearts', earL: 0.1, earR: 0.1, wDroop: -0.08, snd: 'purr' },
    cry: { eyeType: 'sad', ew: 40, eh: 30, gap: 94, mouth: 'sad', yOff: 8, sp: 'tears', earL: -0.35, earR: -0.35, wDroop: 0.25, snd: 'mewl' },
    angry: { eyeType: 'angry', ew: 65, eh: 65, gap: 110, mouth: 'chevron', yOff: 6, sp: null, earL: -0.5, earR: -0.5, wDroop: 0.1, snd: 'hiss' },
    sleepy: { eyeType: 'flat', ew: 50, eh: 6, gap: 88, mouth: 'none', yOff: 16, sp: 'zzz', earL: -0.2, earR: -0.2, wDroop: 0.15, snd: null },
    surprised: { eyeType: 'round', ew: 42, eh: 48, gap: 84, mouth: 'open', yOff: -12, sp: null, earL: 0.3, earR: 0.3, wDroop: -0.15, snd: 'chirp' },
    confused: { eyeType: 'oval', ew: 36, eh: 38, gap: 84, mouth: 'wavy', yOff: 0, sp: 'question', earL: 0.25, earR: -0.15, wDroop: 0.05, snd: 'mewl' },
    scared: { eyeType: 'round', ew: 26, eh: 26, gap: 102, mouth: 'sad', yOff: 8, sp: 'sweatDrop', earL: -0.6, earR: -0.6, wDroop: 0.2, snd: 'mewl' },
    laughing: { eyeType: 'happy', ew: 52, eh: 14, gap: 84, mouth: 'bigSmile', yOff: -12, sp: 'blush', earL: 0.2, earR: 0.2, wDroop: -0.12, snd: 'chirp' },
    winking: { eyeType: 'oval', ew: 50, eh: 40, gap: 88, mouth: 'smile', yOff: 0, sp: 'wink', earL: 0.1, earR: -0.05, wDroop: -0.05, snd: 'meow' },
    thinking: { eyeType: 'oval', ew: 42, eh: 30, gap: 84, mouth: 'flat', yOff: -8, sp: 'dots', earL: 0.2, earR: -0.1, wDroop: 0, snd: null },
    annoyed: { eyeType: 'flat', ew: 52, eh: 12, gap: 84, mouth: 'tiny', yOff: 0, sp: 'vein', earL: -0.3, earR: -0.3, wDroop: 0.1, snd: 'hiss' },
    excited: { eyeType: 'star', ew: 46, eh: 46, gap: 84, mouth: 'bigSmile', yOff: -16, sp: 'sparkle', earL: 0.35, earR: 0.35, wDroop: -0.18, snd: 'chirp' },
    sick: { eyeType: 'cross', ew: 34, eh: 34, gap: 84, mouth: 'wavy', yOff: 12, sp: 'thermometer', earL: -0.4, earR: -0.4, wDroop: 0.2, snd: 'mewl' },
    cheeky: { eyeType: 'happy', ew: 50, eh: 18, gap: 84, mouth: 'tongue', yOff: 0, sp: null, earL: 0.15, earR: -0.1, wDroop: -0.08, snd: 'meow' },
    suspicious: { eyeType: 'flat', ew: 56, eh: 8, gap: 72, mouth: 'flat', yOff: 0, sp: null, earL: -0.1, earR: 0.2, wDroop: 0.05, snd: null },
    listening: { eyeType: 'round', ew: 34, eh: 34, gap: 84, mouth: 'none', yOff: 0, sp: 'soundWave', earL: 0.35, earR: 0.35, wDroop: 0, snd: null },
    dizzy: { eyeType: 'cross', ew: 40, eh: 40, gap: 84, mouth: 'open', yOff: 0, sp: 'swirl', earL: -0.3, earR: 0.3, wDroop: 0.1, snd: 'mewl' },
    bored: { eyeType: 'flat', ew: 52, eh: 16, gap: 88, mouth: 'flat', yOff: 10, sp: 'sweatDrop', earL: -0.15, earR: -0.15, wDroop: 0.12, snd: null },
    love: { eyeType: 'heart', ew: 52, eh: 52, gap: 88, mouth: 'cat', yOff: -6, sp: 'blush', earL: 0.2, earR: 0.2, wDroop: -0.1, snd: 'purr' },
    curious: { eyeType: 'curious', ew: 60, eh: 60, gap: 100, mouth: 'catOpen', yOff: 0, sp: null, earL: 0.2, earR: -0.1, wDroop: 0.1, snd: 'chirp' },
    pleading: { eyeType: 'pleading', ew: 56, eh: 56, gap: 88, mouth: 'wavy', yOff: 4, sp: 'tears', earL: -0.2, earR: -0.2, wDroop: 0.2, snd: 'mewl' },
    defeated: { eyeType: 'flat', ew: 50, eh: 6, gap: 88, mouth: 'flat', yOff: 12, sp: 'ghost', earL: -0.5, earR: -0.5, wDroop: 0.3, snd: 'hiss' },
    sneezing: { eyeType: 'sneeze', ew: 60, eh: 60, gap: 84, mouth: 'wavy', yOff: -10, sp: 'drops', earL: -0.4, earR: -0.4, wDroop: 0.2, snd: 'hiss' },
    eating: { eyeType: 'happy', ew: 50, eh: 20, gap: 88, mouth: 'open', yOff: 0, sp: 'food', earL: 0.15, earR: 0.15, wDroop: -0.1, snd: 'purr' },
    morning: { eyeType: 'sad', ew: 40, eh: 30, gap: 88, mouth: 'sad', yOff: 0, sp: 'bedhead', earL: -0.2, earR: -0.3, wDroop: 0.1, snd: null },
    breakfast: { eyeType: 'happy', ew: 50, eh: 20, gap: 88, mouth: 'smile', yOff: 0, sp: 'toast', earL: 0.1, earR: 0.1, wDroop: -0.1, snd: null },
    slump: { eyeType: 'flat', ew: 50, eh: 6, gap: 88, mouth: 'none', yOff: 15, sp: 'zzz', earL: -0.3, earR: -0.3, wDroop: 0.15, snd: null },
    nightcap: { eyeType: 'flat', ew: 50, eh: 4, gap: 88, mouth: 'none', yOff: 15, sp: 'nightcap', earL: -0.4, earR: -0.4, wDroop: 0.2, snd: null },
    midnight: { eyeType: 'angry', ew: 65, eh: 65, gap: 110, mouth: 'chevron', yOff: 6, sp: 'vein', earL: -0.5, earR: -0.5, wDroop: 0.1, snd: null },
    lowBattery: { eyeType: 'sad', ew: 34, eh: 34, gap: 88, mouth: 'open', yOff: 12, sp: 'battery_low', earL: -0.5, earR: -0.5, wDroop: 0.3, snd: 'hiss' },
    charging: { eyeType: 'star', ew: 50, eh: 50, gap: 84, mouth: 'bigSmile', yOff: -10, sp: 'battery_charge', earL: 0.3, earR: 0.3, wDroop: -0.2, snd: 'purr' },
    hot: { eyeType: 'cross', ew: 40, eh: 40, gap: 88, mouth: 'open', yOff: 0, sp: 'hot', earL: -0.3, earR: -0.3, wDroop: 0.2, snd: 'hiss' },
    cold: { eyeType: 'sad', ew: 34, eh: 34, gap: 88, mouth: 'wavy', yOff: 6, sp: 'snow', earL: -0.4, earR: -0.4, wDroop: 0.2, snd: 'mewl' },
    raining: { eyeType: 'sad', ew: 40, eh: 40, gap: 88, mouth: 'sad', yOff: 8, sp: 'umbrella', earL: -0.2, earR: -0.2, wDroop: 0.1, snd: 'mewl' },
    windy: { eyeType: 'flat', ew: 56, eh: 8, gap: 88, mouth: 'flat', yOff: 10, sp: 'windLines', earL: -0.5, earR: -0.5, wDroop: 0.3, snd: 'hiss' },
    sunny: { eyeType: 'happy', ew: 50, eh: 20, gap: 88, mouth: 'smile', yOff: -8, sp: 'sunglasses', earL: 0.2, earR: 0.2, wDroop: -0.1, snd: 'purr' },
    drinking: { eyeType: 'happy', ew: 46, eh: 18, gap: 84, mouth: 'tiny', yOff: 0, sp: 'straw', earL: 0.1, earR: 0.1, wDroop: -0.05, snd: 'purr' },
    listening_music: { eyeType: 'round', ew: 38, eh: 38, gap: 84, mouth: 'smile', yOff: -5, sp: 'musicNotes', earL: 0.3, earR: 0.3, wDroop: -0.1, snd: 'purr' },
    reading: { eyeType: 'oval', ew: 42, eh: 30, gap: 88, mouth: 'flat', yOff: 0, sp: 'glasses', earL: 0.1, earR: 0.1, wDroop: 0, snd: null },
    workout: { eyeType: 'angry', ew: 50, eh: 50, gap: 100, mouth: 'open', yOff: 0, sp: 'sweatband', earL: 0.2, earR: 0.2, wDroop: -0.1, snd: 'hiss' },
    yawning: { eyeType: 'sad', ew: 45, eh: 45, gap: 84, mouth: 'open', yOff: 10, sp: 'tear_single', earL: -0.3, earR: -0.3, wDroop: 0.15, snd: 'mewl' },
    hiding: { eyeType: 'round', ew: 30, eh: 30, gap: 88, mouth: 'tiny', yOff: 0, sp: 'sweatDrop', earL: -0.5, earR: -0.5, wDroop: 0.2, snd: 'hiss' },
    dancing: { eyeType: 'star', ew: 46, eh: 46, gap: 88, mouth: 'bigSmile', yOff: -10, sp: 'dance_lines', earL: 0.25, earR: 0.25, wDroop: -0.1, snd: 'purr' }
};

// Hardware states overriding time-of-day

function getBaseTimeEmotion() {

    const h = new Date().getHours();
    if (h >= 6 && h < 9) return 'morning';
    if (h >= 9 && h < 11) return 'breakfast';
    if (h >= 14 && h < 16) return 'slump';
    if (h >= 21 && h <= 23) return 'nightcap';
    if (h >= 0 && h < 6) return 'midnight';
    return 'neutral';
}

let currentEmotion = getBaseTimeEmotion();
let emotionEndTime = 0;

// Anim state
let breathTimer = 0;
let isBlinking = false;
let blinkTimer = 0;
let blinkH = 1; // 0..1 animated blink amount
let animT = 0;
let tearDrops = [];
let heartParts = [];
let sparkles = [];

// Smoothed ear angles (for silky transitions)
let smoothEarL = 0;
let smoothEarR = 0;
let smoothWDroop = 0;

function setEmotion(name, dur = 3) {
    if (!EMOTIONS[name]) return;
    currentEmotion = name;
    emotionEndTime = Date.now() + dur * 1000;
    emotionLabel.textContent = name.toUpperCase();
    if (name === 'cry') initTears();
    if (name === 'cuddle') initHearts();
    if (name === 'excited') initSparkles();
    // Play cat sound for this emotion
    const snd = EMOTIONS[name].snd;
    if (snd) playCatSound(snd);
}
