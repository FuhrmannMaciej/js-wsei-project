const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];

function createBalls(numBalls) {
  for (let i = 0; i < numBalls; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    const dx = (Math.random() - 0.5) * 10;
    const dy = (Math.random() - 0.5) * 10;

    const ball = { x, y, dx, dy };
    balls.push(ball);
  }
}

function drawBalls() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();

    ball.x += ball.dx;
    ball.y += ball.dy;
  });
}

function animate() {
  requestAnimationFrame(animate);
  drawBalls();
}

createBalls(20);
animate();
