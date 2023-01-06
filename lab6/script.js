const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const threshold = 200;

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
}

function animate() {
  requestAnimationFrame(animate);
  drawBalls();
}

const slider = document.querySelector('#slider');
slider.addEventListener('input', () => {
  createBalls(slider.value);
});

createBalls(20);
animate();
