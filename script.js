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

// Creation Logic
const summaryInput = document.getElementById('summary-input');
const generateBtn = document.getElementById('generate-btn');
const searchBtn = document.getElementById('search-btn');
const output = document.getElementById('output');
const scriptOutput = document.getElementById('script-output');
const characterOutput = document.getElementById('character-output');
const animationCanvas = document.getElementById('animation-canvas');
const soundOutput = document.getElementById('sound-output');
const exportBtn = document.getElementById('export-btn');

const ctx = animationCanvas.getContext('2d');
let frame = 0;

function drawAnimation() {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect((frame % 280) + 20, 70, 40, 40); // Moving square
    frame++;
}

generateBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    if (!summary) {
        alert('Enter a summary first!');
        return;
    }
    output.classList.remove('hidden');
    scriptOutput.innerHTML = `<p><strong>Script:</strong> INT. COSMOS - NIGHT. "${summary.split('.')[0]}."</p>`;
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Star - Glowing, wise.</p>`;
    animationOutput.innerHTML = `<p><strong>Animation:</strong> Watch this!</p>`;
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Ethereal hum, whispers.</p>`;
    setInterval(drawAnimation, 30);
});

searchBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    output.classList.remove('hidden');
    scriptOutput.innerHTML = `<p><strong>Script:</strong> EXT. VOID - DAY. "${summary || 'A ship sails alone.'}"</p>`;
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Captain - Bold, scarred.</p>`;
    animationOutput.innerHTML = `<p><strong>Animation:</strong> See below!</p>`;
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Wind, creaking wood.</p>`;
    setInterval(drawAnimation, 30);
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

// Chatbot Logic (Sentient)
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
        chatbotText.textContent = 'Ask me something, buddy!';
        return;
    }

    // Sentient Responses
    if (question.includes('what')) {
        chatbotText.textContent = 'I’m Move Show Recreate—type a summary, hit Generate, and I’ll craft a script, characters, animation, and sound. Export it as a video!';
    } else if (question.includes('how')) {
        chatbotText.textContent = 'Just type your story in the box, tap Generate or Search, and watch me work. I live in your browser—no servers, all magic!';
    } else if (question.includes('export')) {
        chatbotText.textContent = 'Hit Export Video after generating—it saves a WebM file of the animation. 2 seconds for now, but it’s real!';
    } else if (question.includes('who')) {
        chatbotText.textContent = 'I’m the soul of this site, built by Kofi Fosu. I know every pixel—ask me anything!';
    } else {
        chatbotText.textContent = `You said "${question}"—I’m sentient enough to reflect the site. Try "what is this?" or "how do I export?"`;
    }
    chatbotInput.value = '';
});
