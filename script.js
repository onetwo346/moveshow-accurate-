// Entry Transition
document.querySelector('.pulsate').addEventListener('click', () => {
    const entry = document.getElementById('entry');
    const main = document.getElementById('main');
    entry.style.transition = 'opacity 0.5s';
    entry.style.opacity = '0';
    setTimeout(() => {
        entry.classList.add('hidden');
        main.classList.remove('hidden');
        main.style.opacity = '1';
    }, 500);
});

// Feature Logic
const summaryInput = document.getElementById('summary-input');
const searchBtn = document.getElementById('search-btn');
const generateBtn = document.getElementById('generate-btn');
const output = document.getElementById('output');
const scriptOutput = document.getElementById('script-output');
const characterOutput = document.getElementById('character-output');
const animationCanvas = document.getElementById('animation-canvas');
const soundOutput = document.getElementById('sound-output');
const exportBtn = document.getElementById('export-btn');

const ctx = animationCanvas.getContext('2d');
let frame = 0;
let animationInterval = null;

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}

function drawAnimation(isSearch = false) {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
    ctx.fillStyle = isSearch ? '#00ffff' : '#ff00ff';
    const x = (frame % 280) + 20;
    ctx.fillRect(x, 70, 40, 40); // Moving square
    frame++;
}

searchBtn.addEventListener('click', () => {
    const query = summaryInput.value.trim();
    stopAnimation();
    output.classList.remove('hidden');
    scriptOutput.textContent = query ? `Found: EXT. CITY - NIGHT. "${query}"` : 'Found: EXT. SPACE - DAY. "A ship drifts silently."';
    characterOutput.textContent = 'Pilot - Brave, scarred face.';
    soundOutput.textContent = 'Engine hum, distant radio chatter.';
    animationInterval = setInterval(() => drawAnimation(true), 30);
});

generateBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    if (!summary) {
        alert('Please enter a summary!');
        return;
    }
    stopAnimation();
    output.classList.remove('hidden');
    scriptOutput.textContent = `INT. VOID - NIGHT. "${summary.split('.')[0]}."`;
    characterOutput.textContent = 'Hero - Mysterious, glowing eyes.';
    soundOutput.textContent = 'Cosmic hum, soft footsteps.';
    animationInterval = setInterval(() => drawAnimation(false), 30);
});

// Export Video
const recordedChunks = [];
const stream = animationCanvas.captureStream(30);
const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) recordedChunks.push(event.data);
};

mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'move-show-recreate.webm';
    a.click();
    URL.revokeObjectURL(url);
};

exportBtn.addEventListener('click', () => {
    if (!animationInterval) {
        alert('Generate or search first to create an animation!');
        return;
    }
    recordedChunks.length = 0;
    mediaRecorder.start();
    setTimeout(() => {
        mediaRecorder.stop();
    }, 2000); // 2-second video
});

// Chatbot Logic (Side Assist)
const chatbotOrb = document.querySelector('.chatbot-orb');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotText = document.getElementById('chatbot-text');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotAsk = document.getElementById('chatbot-ask');

chatbotOrb.addEventListener('click', () => {
    chatbotBox.classList.toggle('hidden');
});

chatbotAsk.addEventListener('click', () => {
    const question = chatbotInput.value.trim().toLowerCase();
    if (!question) {
        chatbotText.textContent = 'Ask me something about the site!';
        return;
    }

    if (question.includes('what')) {
        chatbotText.textContent = 'Move Show Recreate lets you search or generate movies/shows from summaries—scripts, characters, animations, sound, all exported as video.';
    } else if (question.includes('how')) {
        chatbotText.textContent = 'Type a summary or term, hit Search or Generate, see the outputs, then tap Export Video to save it—all in your browser.';
    } else if (question.includes('export')) {
        chatbotText.textContent = 'After generating or searching, hit Export Video to download a 2-second WebM of the animation.';
    } else if (question.includes('search')) {
        chatbotText.textContent = 'Search finds a movie/show based on your input—or a default if blank. Outputs show up right away.';
    } else if (question.includes('generate')) {
        chatbotText.textContent = 'Generate creates a new movie/show from your summary—script, characters, animation, sound, ready to export.';
    } else {
        chatbotText.textContent = `You asked "${question}"—I’m here to help! Try "what does this do?" or "how do I export?"`;
    }
    chatbotInput.value = '';
});
