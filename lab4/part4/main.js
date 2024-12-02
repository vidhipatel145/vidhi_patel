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

// Shape class to define basic properties for any shape (balls and evil circle)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class inheriting from Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true; // Ball exists by default
  }

  // Draw the ball on canvas
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
  }

  // Update the ball's position
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

  // Collision detection between balls
  collisionDetect(balls) {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB(); // Change color on collision
        }
      }
    }
  }
}

// EvilCircle class inheriting from Shape
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.size = 10;
    this.color = 'white';
  }

  // Draw the evil circle on canvas
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  // Prevent evil circle from going off the canvas
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

  // Collision detection between evil circle and balls
  collisionDetect(balls) {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // Ball is eaten by the evil circle
        }
      }
    }
  }
}

// Setting up the canvas and context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let balls = [];
let evilCircle = new EvilCircle(100, 100);
let ballCount = 0;

// Create multiple balls
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

// Display ball count
const ballCountElement = document.getElementById('ball-count');

// Update the ball count on screen
function updateBallCount() {
  ballCountElement.textContent = `Ball count: ${balls.filter(ball => ball.exists).length}`;
}

// Event listener to move the evil circle
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

// Main loop to animate the balls and evil circle
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw, update, and check collisions for each ball
  balls.forEach((ball) => {
    if (ball.exists) {
      ball.draw(ctx);
      ball.update();
      ball.collisionDetect(balls);
    }
  });

  // Draw and update the evil circle
  evilCircle.draw(ctx);
  evilCircle.checkBounds();
  evilCircle.collisionDetect(balls);

  // Update ball count
  updateBallCount();

  // Call loop again
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();

