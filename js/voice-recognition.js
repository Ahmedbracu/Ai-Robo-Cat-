// ============================================================
//  VOICE RECOGNITION (3-Step State Machine & Sentiment Brain)
// ============================================================
const micBtn = document.getElementById('micBtn');
const transcriptEl = document.getElementById('transcript');
let recognition = null;
let isListening = false;
let transcriptTimeout = null;

function showTranscript(text) {
    transcriptEl.textContent = '\u{1F399}\uFE0F "' + text + '"';
    transcriptEl.classList.add('visible');
    clearTimeout(transcriptTimeout);
    transcriptTimeout = setTimeout(() => {
        transcriptEl.classList.remove('visible');
    }, 3000);
}

function initVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Web Speech API not supported in this browser.');
        micBtn.title = 'Voice not supported';
        micBtn.style.opacity = '0.3';
        micBtn.style.pointerEvents = 'none';
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // Magic setting for live immediate reactions!
    recognition.lang = 'en-US';

    let reactTimeout = null;

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        // --- STEP 1: IMMEDIATE REACTION (While speaking) ---
        if (interimTranscript.length > 0) {
            clearTimeout(reactTimeout);
            if (currentEmotion === 'neutral' || currentEmotion === 'bored' || currentEmotion === 'sleepy') {
                setEmotion('listening', 2);
            }
        }

        // --- STEP 2: PROCESSING (Finished speaking) ---
        if (finalTranscript !== '') {
            const text = finalTranscript.trim().toLowerCase();
            console.log("User said: ", text);
            showTranscript(text);

            // Show "thinking" face briefly while processing
            setEmotion('thinking', 1);

            // --- STEP 3: ANALYZE AND REACT (The Pet Brain) ---
            // Give it a short delay for dramatic, pet-like effect
            reactTimeout = setTimeout(() => {
                petBrainReact(text);
            }, 800);
        }
    };

    recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            stopListening();
        }
    };

    recognition.onend = () => {
        // Auto-restart if still supposed to be listening
        if (isListening) {
            try { recognition.start(); } catch (e) { /* already started */ }
        }
    };
}

// --- The "Pet Brain" Sentiment Analyzer ---
function petBrainReact(sentence) {
    let sentimentScore = 0;

    const positiveWords = ["good", "love", "happy", "beautiful", "play", "yay", "sweet", "best", "awesome", "great", "cute"];
    const negativeWords = ["bad", "hate", "sad", "stop", "no", "angry", "broken", "ugly", "quiet", "annoying"];
    const confusingWords = ["what", "how", "why", "explain", "who", "quantum", "math"];
    const scaryWords = ["boo", "watch out", "monster", "spider", "careful", "ghost"];
    const funnyWords = ["joke", "haha", "silly", "funny", "laugh"];

    // Add basic keyword overrides for specific actions
    if (sentence.includes("bed") || sentence.includes("sleep")) { setEmotion("sleepy", 4); return; }
    if (sentence.includes("cuddle") || sentence.includes("hug")) { setEmotion("cuddle", 4); return; }
    if (sentence.includes("sick") || sentence.includes("cough")) { setEmotion("sick", 4); return; }
    if (sentence.includes("spin") || sentence.includes("roll")) { setEmotion("dizzy", 4); return; }
    if (sentence.includes("sneeze") || sentence.includes("achoo")) { setEmotion("sneezing", 4); return; }
    if (sentence.includes("eat") || sentence.includes("food") || sentence.includes("hungry")) { setEmotion("eating", 4); return; }
    if (sentence.includes("please") || sentence.includes("puppy")) { setEmotion("pleading", 4); return; }
    if (sentence.includes("give up") || sentence.includes("defeated") || sentence.includes("ghost")) { setEmotion("defeated", 4); return; }
    if (sentence.includes("curious") || sentence.includes("hmm") || sentence.includes("what is that")) { setEmotion("curious", 4); return; }
    if (sentence.includes("hot") || sentence.includes("warm")) { setEmotion("hot", 4); return; }
    if (sentence.includes("cold") || sentence.includes("freeze")) { setEmotion("cold", 4); return; }
    if (sentence.includes("rain") || sentence.includes("umbrella")) { setEmotion("raining", 4); return; }
    if (sentence.includes("wind") || sentence.includes("blow")) { setEmotion("windy", 4); return; }
    if (sentence.includes("sun") || sentence.includes("glasses") || sentence.includes("cool")) { setEmotion("sunny", 4); return; }
    if (sentence.includes("drink") || sentence.includes("thirsty")) { setEmotion("drinking", 4); return; }
    if (sentence.includes("music") || sentence.includes("song") || sentence.includes("listen")) { setEmotion("listening_music", 4); return; }
    if (sentence.includes("read") || sentence.includes("book")) { setEmotion("reading", 4); return; }
    if (sentence.includes("workout") || sentence.includes("exercise") || sentence.includes("gym")) { setEmotion("workout", 4); return; }
    if (sentence.includes("yawn")) { setEmotion("yawning", 4); return; }
    if (sentence.includes("hide") || sentence.includes("peek")) { setEmotion("hiding", 4); return; }
    if (sentence.includes("dance") || sentence.includes("rock")) { setEmotion("dancing", 4); return; }

    const words = sentence.split(" ");
    let isConfused = false;
    let isScared = false;
    let isFunny = false;

    words.forEach(word => {
        if (positiveWords.includes(word)) sentimentScore += 1;
        if (negativeWords.includes(word)) sentimentScore -= 1;
        if (confusingWords.includes(word)) isConfused = true;
        if (scaryWords.includes(word)) isScared = true;
        if (funnyWords.includes(word)) isFunny = true;
    });

    console.log("Sentiment Score: ", sentimentScore);

    // Decide reaction based on flags and score
    if (isScared) {
        setEmotion("scared", 4);
    } else if (isConfused) {
        setEmotion("confused", 4);
    } else if (isFunny) {
        setEmotion("laughing", 4);
    } else if (sentence.includes("love")) {
        setEmotion("love", 4); // Special heart eyes and blush!
    } else if (sentimentScore > 1) {
        setEmotion("excited", 4); // Very positive
    } else if (sentimentScore === 1) {
        setEmotion("happy", 4);   // Mildly positive
    } else if (sentimentScore < -1) {
        setEmotion("cry", 4);     // Very negative
    } else if (sentimentScore === -1) {
        setEmotion("angry", 4);   // Mildly negative
    } else {
        // Neutral sentiment score (0)
        const randomNeutral = Math.random() > 0.5 ? "winking" : "cheeky";
        setEmotion(randomNeutral, 3);
    }
}

function startListening() {
    if (!recognition) initVoice();
    if (!recognition) return;
    isListening = true;
    micBtn.classList.add('listening');
    try { recognition.start(); } catch (e) { /* already started */ }
    setEmotion('listening', 3);
}

function stopListening() {
    isListening = false;
    micBtn.classList.remove('listening');
    if (recognition) {
        try { recognition.stop(); } catch (e) { /* already stopped */ }
    }
    setEmotion(getBaseTimeEmotion(), 2);
}

micBtn.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
});

// Initialize voice on load (lazy — recognition starts on first click)
initVoice();
