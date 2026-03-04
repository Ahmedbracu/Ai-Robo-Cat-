// ============================================================
//  CAT SOUNDS  (Web Audio API — synthesised)
// ============================================================
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playCatSound(type) {
    try {
        const ac = getAudioCtx();
        const now = ac.currentTime;
        const g = ac.createGain();
        g.connect(ac.destination);

        switch (type) {
            case 'purr': {
                // Low rumbling purr — two detuned oscillators
                const dur = 1.2;
                const o1 = ac.createOscillator(); o1.type = 'sine'; o1.frequency.value = 26;
                const o2 = ac.createOscillator(); o2.type = 'sine'; o2.frequency.value = 28;
                const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 24;
                const lfoGain = ac.createGain(); lfoGain.gain.value = 8;
                lfo.connect(lfoGain); lfoGain.connect(o1.frequency); lfoGain.connect(o2.frequency);
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.12, now + 0.15);
                g.gain.setValueAtTime(0.12, now + dur - 0.3);
                g.gain.linearRampToValueAtTime(0, now + dur);
                o1.connect(g); o2.connect(g); lfo.start(now);
                o1.start(now); o2.start(now);
                o1.stop(now + dur); o2.stop(now + dur); lfo.stop(now + dur);
                break;
            }
            case 'meow': {
                // Classic meow — frequency sweep
                const dur = 0.55;
                const o = ac.createOscillator(); o.type = 'sine';
                o.frequency.setValueAtTime(480, now);
                o.frequency.linearRampToValueAtTime(720, now + 0.12);
                o.frequency.linearRampToValueAtTime(560, now + 0.35);
                o.frequency.linearRampToValueAtTime(340, now + dur);
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.18, now + 0.05);
                g.gain.setValueAtTime(0.18, now + 0.3);
                g.gain.linearRampToValueAtTime(0, now + dur);
                o.connect(g); o.start(now); o.stop(now + dur);
                break;
            }
            case 'hiss': {
                // Angry hiss — filtered white noise
                const dur = 0.6;
                const bufSize = ac.sampleRate * dur;
                const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
                const data = buf.getChannelData(0);
                for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
                const src = ac.createBufferSource(); src.buffer = buf;
                const filt = ac.createBiquadFilter(); filt.type = 'highpass'; filt.frequency.value = 3000;
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.14, now + 0.04);
                g.gain.setValueAtTime(0.14, now + 0.2);
                g.gain.linearRampToValueAtTime(0, now + dur);
                src.connect(filt); filt.connect(g); src.start(now); src.stop(now + dur);
                break;
            }
            case 'mewl': {
                // Plaintive mewl — sad kitten
                const dur = 0.7;
                const o = ac.createOscillator(); o.type = 'sine';
                o.frequency.setValueAtTime(600, now);
                o.frequency.linearRampToValueAtTime(520, now + 0.2);
                o.frequency.linearRampToValueAtTime(400, now + dur);
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.13, now + 0.06);
                g.gain.setValueAtTime(0.13, now + 0.45);
                g.gain.linearRampToValueAtTime(0, now + dur);
                o.connect(g); o.start(now); o.stop(now + dur);
                break;
            }
            case 'chirp': {
                // Excited chirp / trill
                const dur = 0.35;
                const o = ac.createOscillator(); o.type = 'sine';
                const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 28;
                const lfoG = ac.createGain(); lfoG.gain.value = 120;
                lfo.connect(lfoG); lfoG.connect(o.frequency);
                o.frequency.setValueAtTime(800, now);
                o.frequency.linearRampToValueAtTime(1100, now + 0.1);
                o.frequency.linearRampToValueAtTime(700, now + dur);
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.15, now + 0.03);
                g.gain.setValueAtTime(0.12, now + 0.2);
                g.gain.linearRampToValueAtTime(0, now + dur);
                o.connect(g); lfo.start(now); o.start(now);
                o.stop(now + dur); lfo.stop(now + dur);
                break;
            }
        }
    } catch (e) { /* AudioContext not ready */ }
}
