const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

// Fungsi untuk memulai permainan
function startGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    generateFood();
    scoreDisplay.innerText = `Skor: ${score}`;
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Fungsi utama permainan
function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over! Skor Anda: ' + score);
        return;
    }
    draw();
}

// Fungsi untuk memperbarui posisi ular
function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Jika ular makan makanan
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = `Skor: ${score}`;
        generateFood();
    } else {
        snake.pop(); // Hapus bagian ekor ular
    }
}

// Fungsi untuk menghasilkan makanan
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Fungsi untuk memeriksa tabrakan
function checkCollision() {
    const head = snake[0];
    // Tabrakan dengan dinding
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Tabrakan dengan tubuh sendiri
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Fungsi untuk menggambar ular dan makanan
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Event listener untuk mengubah arah ular
document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Mencegah perilaku default (scrolling)
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -10 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
});

// Event listener untuk tombol mulai
startButton.addEventListener('click', startGame);