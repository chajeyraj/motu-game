    /*this is a chajey's game....*/
const motu = document.getElementById('motu');
const samosa = document.getElementById('samosa');
const coconut = document.getElementById('coconut');
const scoreDisplay = document.getElementById('score');
let score = 0;
let motuPosition = 125; // Starting position of the motu
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && motuPosition > 0) {
        motuPosition -= 20;
    } else if (event.key === 'ArrowRight' && motuPosition < 250) {
        motuPosition += 20;
    }
    motu.style.left = `${motuPosition}px`;
});

function startGame() {
    // Place initial objects randomly
    resetObject(samosa, 'samosa');
    resetObject(coconut, 'coconut');

    gameInterval = setInterval(() => {
        moveObject(samosa, 'samosa');
        moveObject(coconut, 'coconut');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let motuRect = motu.getBoundingClientRect();
    let samosaRect = samosa.getBoundingClientRect();
    let coconutRect = coconut.getBoundingClientRect();

    // Check collision with samosa
    if (motuRect.left < samosaRect.right &&
        motuRect.right > samosaRect.left &&
        motuRect.top < samosaRect.bottom &&
        motuRect.bottom > samosaRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(samosa, 'samosa');
    }

    // Check collision with coconut
    if (motuRect.left < coconutRect.right &&
        motuRect.right > coconutRect.left &&
        motuRect.top < coconutRect.bottom &&
        motuRect.bottom > coconutRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();
