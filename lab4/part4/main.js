/* 
Name: Vidhi Patel 
File: main.js 
Date: 01 December 2024 
This JavaScript file implements the bouncing balls simulation, including interactive controls, the evil circle, and score tracking.
*/

// Utility function to generate random RGB colors
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.size = 10;
    this.color = 'white';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= canvas.width) {
      this.x = canvas.width - this.size;
    }
    if (this.x - this.size <= 0) {
      this.x = this.size;
    }
    if (this.y + this.size >= canvas.height) {
      this.y = canvas.height - this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  console.error('Canvas context not found');
  return;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let evilCircle = new EvilCircle(100, 100);
let ballCount = 0;

for (let i = 0; i < 10; i++) {
  const size = Math.random() * 20 + 10;
  const x = Math.random() * (canvas.width - size * 2) + size;
  const y = Math.random() * (canvas.height - size * 2) + size;
  const velX = Math.random() * 4 + 1;
  const velY = Math.random() * 4 + 1;
  const color = randomRGB();
  balls.push(new Ball(x, y, velX, velY, size, color));
  ballCount++;
}

const ballCountElement = document.getElementById('ball-count');

function updateBallCount() {
  ballCountElement.textContent = `Ball count: ${balls.filter(ball => ball.exists).length}`;
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      evilCircle.x -= evilCircle.velX;
      break;
    case 'd':
      evilCircle.x += evilCircle.velX;
      break;
    case 'w':
      evilCircle.y -= evilCircle.velY;
      break;
    case 's':
      evilCircle.y += evilCircle.velY;
      break;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    if (ball.exists) {
      ball.draw(ctx);
      ball.update();
      ball.collisionDetect(balls);
    }
  });

  evilCircle.draw(ctx);
  evilCircle.checkBounds();
  evilCircle.collisionDetect(balls);

  updateBallCount();

  requestAnimationFrame(loop);
}

loop();
