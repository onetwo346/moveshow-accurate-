// Entry to Main Transition
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

function drawAnimation(isSearch = false) {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
    ctx.fillStyle = isSearch ? '#00ffff' : '#ff00ff';
    ctx.fillRect((frame % 280) + 20, 70, 40, 40); // Moving square
    frame++;
}

searchBtn.addEventListener('click', () => {
    const query = summaryInput.value.trim();
    output.classList.remove('hidden');
    scriptOutput.innerHTML = `<p><strong>Found Script:</strong> EXT. SPACE - DAY. "${query || 'A lone ship drifts.'}"</p>`;
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Pilot - Brave, weathered.</p>`;
    animationOutput.innerHTML = `<p><strong>Animation:</strong> Playing below!</p>`;
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Engine rumble, static.</p>`;
    setInterval(() => drawAnimation(true), 30);
});

generateBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    if (!summary) {
        alert('Enter a summary first!');
        return;
    }
    output.classList.remove('hidden');
    scriptOutput.innerHTML = `<p><strong>Script:</strong> INT. VOID - NIGHT. "${summary.split('.')[0]}."</p>`;
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Hero - Mysterious, glowing eyes.</p>`;
    animationOutput.innerHTML = `<p><strong>Animation:</strong> Watch this!</p>`;
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Cosmic hum, footsteps.</p>`;
    setInterval(() => drawAnimation(false), 30);
});

// Export Video
const recordedChunks = [];
const mediaRecorder = new MediaRecorder(animationCanvas.captureStream(30), { mimeType: 'video/webm' });

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
        chatbotText.textContent = 'Ask me about the site, buddy!';
        return;
    }

    if (question.includes('what')) {
        chatbotText.textContent = 'This is Move Show Recreate—type a summary, hit Generate to create a movie/show, or Search to find one. All happens here!';
    } else if (question.includes('how')) {
        chatbotText.textContent = 'Type in the box, tap Search or Generate, see the outputs, then hit Export Video to save it. All in your browser!';
    } else if (question.includes('export')) {
        chatbotText.textContent = 'After generating or searching, tap Export Video—it saves a 2-second WebM of the animation.';
    } else if (question.includes('features')) {
        chatbotText.textContent = 'Search existing movies/shows, generate new ones with script, characters, animation, sound, and export—all on the main page!';
    } else {
        chatbotText.textContent = `You asked "${question}"—I’m here to assist. Try "what does this do?" or "how do I export?"`;
    }
    chatbotInput.value = '';
});
