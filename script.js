
const paragraphEl = document.getElementById('paragraph');
const inputBox = document.getElementById('inputBox');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

let paragraphText = "";
let timeLeft = 60;
let timer;

// randome paragraphs
function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphText = paragraphs[randomIndex];
    paragraphEl.innerHTML = '';
    paragraphText.split('').forEach(char => {
        let spanTag = `<span class="untyped">${char}</span>`;
        paragraphEl.innerHTML += spanTag;
    });
}

// timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = `Time: ${timeLeft}s`;
        } else {    
            clearInterval(timer);
            calculateResults();
            inputBox.disabled = true;
            restartBtn.style.display = 'block';
        }
    }, 1000);
}

// updating paragraph
function updateParagraph() {
    const spans = paragraphEl.querySelectorAll('span');
    const inputText = inputBox.value.split('');

    spans.forEach((span, index) => {
        const typedChar = inputText[index] || '';
        if (span.textContent === typedChar) {
            span.classList.add('correct');
            span.classList.remove('untyped', 'incorrect');
        } else if (typedChar) {
            span.classList.add('incorrect');
            span.classList.remove('untyped', 'correct');
        } else {
            span.classList.add('untyped');
            span.classList.remove('correct', 'incorrect');
        }
    });
}

// calculating result
function calculateResults() {
    updateParagraph();  
    const correctWords = inputBox.value.trim().split(' ').filter((word, index) => word === paragraphText.split(' ')[index]).length;
    const wpm = Math.round((correctWords / 60) * 60);
    resultEl.textContent = `WPM: ${wpm}`;
}

// try again button
restartBtn.addEventListener('click', () => {
    inputBox.disabled = false;
    inputBox.value = '';
    resultEl.textContent = '';
    timerEl.textContent = 'Time: 60s';
    restartBtn.style.display = 'none';
    timeLeft = 60;
    randomParagraph();
    timer = null;
});

inputBox.addEventListener('input', () => {
    updateParagraph();
});

inputBox.addEventListener('focus', () => {
    if (!timer) startTimer();
});

randomParagraph();


