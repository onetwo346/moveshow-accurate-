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

// Chatbot Logic
const chatbotOrb = document.querySelector('.chatbot-orb');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotText = document.getElementById('chatbot-text');
const chatbotClose = document.getElementById('chatbot-close');
const summaryInput = document.getElementById('summary-input');
const generateBtn = document.getElementById('generate-btn');
const searchBtn = document.getElementById('search-btn');
const output = document.getElementById('output');
const scriptOutput = document.getElementById('script-output');
const characterOutput = document.getElementById('character-output');
const animationCanvas = document.getElementById('animation-canvas');
const soundOutput = document.getElementById('sound-output');
const exportBtn = document.getElementById('export-btn');

chatbotOrb.addEventListener('click', () => {
    chatbotBox.classList.toggle('hidden');
});

chatbotClose.addEventListener('click', () => {
    chatbotBox.classList.add('hidden');
});

// Animation Setup
const ctx = animationCanvas.getContext('2d');
let frame = 0;

function drawAnimation() {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(frame % 320, 50, 50, 50); // Simple moving square
    frame = (frame + 1) % 320;
}

// Generate Logic
generateBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    if (!summary) {
        chatbotText.textContent = 'Please enter a summary!';
        return;
    }

    chatbotText.textContent = `Generating from: "${summary}"...`;
    output.classList.remove('hidden');

    // Script
    scriptOutput.innerHTML = `<p><strong>Script:</strong> INT. SPACE - NIGHT. "${summary.split('.')[0]}."</p>`;

    // Characters
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Protagonist - Bold, glowing aura.</p>`;

    // Animation (Simple Canvas Demo)
    animationOutput.innerHTML = `<p><strong>Animation:</strong> Watch this!</p>`;
    setInterval(drawAnimation, 30); // Basic animation loop

    // Sound (Text Description)
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Cosmic hum, footsteps.</p>`;
});

// Search Logic
searchBtn.addEventListener('click', () => {
    const summary = summaryInput.value.trim();
    chatbotText.textContent = summary
        ? `Searching "${summary}"... Found: "Cosmic Tale."`
        : 'Searching... Here’s "Starlight Run."';
    output.classList.remove('hidden');
    scriptOutput.innerHTML = `<p><strong>Script:</strong> EXT. DESERT - DAY. A runner races the sun.</p>`;
    characterOutput.innerHTML = `<p><strong>Characters:</strong> Runner - Fast, determined.</p>`;
    animationOutput.innerHTML = `<p><strong>Animation:</strong> See below!</p>`;
    setInterval(drawAnimation, 30);
    soundOutput.innerHTML = `<p><strong>Sound:</strong> Wind, rhythmic beats.</p>`;
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
    chatbotText.textContent = 'Video saved! Fuel our adventure?';
};

exportBtn.addEventListener('click', () => {
    recordedChunks.length = 0; // Reset
    mediaRecorder.start();
    setTimeout(() => {
        mediaRecorder.stop();
    }, 2000); // Record 2 seconds
});
