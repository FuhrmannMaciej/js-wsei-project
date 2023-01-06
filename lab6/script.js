const canvas = document.querySelector('#canvas')
const fpsSpan = document.querySelector('#fps');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let prevTime = performance.now();

let balls = [];
let threshold;
let animating = false;

function createBalls(numBalls) {
  balls = [];
  for (let i = 0; i < numBalls; i++) {
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;

    const dx = (Math.random() - 0.5) * 10;
    const dy = (Math.random() - 0.5) * 10;

    const ball = { x, y, dx, dy };
    balls.push(ball);
  }
}

function drawBalls() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball1 => {
    ctx.beginPath();
    ctx.arc(ball1.x, ball1.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();

    ball1.x += ball1.dx;
    ball1.y += ball1.dy;

    if (ball1.x + 20 > canvas.width || ball1.x - 20 < 0) {
      ball1.dx = -ball1.dx;
    }
    if (ball1.y + 20 > canvas.height || ball1.y - 20 < 0) {
      ball1.dy = -ball1.dy;
    }

    balls.forEach(ball2 => {
      if (ball1 !== ball2) {
        const distance = Math.sqrt(
          Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2)
        );
        if (distance < threshold) {
          ctx.beginPath();
          ctx.moveTo(ball1.x, ball1.y);
          ctx.lineTo(ball2.x, ball2.y);
          ctx.strokeStyle = '#0095dd';
          ctx.stroke();
        }
      }
    });
  });

  const currentTime = performance.now();
  const elapsedTime = currentTime - prevTime;
  prevTime = currentTime;
  let currentFps = Math.round(1000 / elapsedTime);
  fpsSpan.textContent = currentFps;
}

function reset() {
  animating = false;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const numBalls = document.getElementById('num-balls-slider').value = 20;
  document.getElementById('threshold-slider').value = 200;
  createBalls(numBalls);
}

const ballsSlider = document.querySelector('#num-balls-slider');
ballsSlider.addEventListener('input', () => {
  createBalls(ballsSlider.value);
});

const thresholdSlider = document.querySelector('#threshold-slider');
thresholdSlider.addEventListener('input', () => {
  threshold = thresholdSlider.value;
});

const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');

startButton.addEventListener('click', () => {
  if (!animating) {
    animating = true;
    animate();
  }
});

resetButton.addEventListener('click', reset);

function animate() {
  if (animating) {
    requestAnimationFrame(animate);
    drawBalls();
  }
}

createBalls(20);
animate();
