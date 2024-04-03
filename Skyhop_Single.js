const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let platformWidth = 65;
let platformHeight = 15;

const platformStart = canvas.height - 50;
const gravity = 0.33;
const bounceVelocity = -10.5;

let minPlatformSpace = 90;
let maxPlatformSpace = 120;
let leftSpeed = -4;
let rightSpeed = 4;
let score = 0;

let platforms = [{
  x: canvas.width / 2 - platformWidth / 2,
  y: platformStart
}];

function random(min, max) {
  return Math.random() * (max - min) + min;
}
let y = platformStart;
while (y > 0) {
  y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);
  do {
    x = random(1 , canvas.width - 1 - platformWidth);
  } while (
    y > canvas.height / 2 && Math.abs(x - canvas.width / 2) > platformWidth / 2
  );
    platforms.push({ x, y });
}
const player = {
  width: 30,
  height: 45,
  x: canvas.width /2 - 20,
  y: platformStart - 60,
  dx: 0,
  dy: 0
};

let keydown = false;
let prevPlayerY = player.y;
function tutorial() {
  const tutorial = document.getElementById('tutorial');
  const ctx = tutorial.getContext('2d');
  ctx.clearRect(0, 0, tutorial.width, tutorial.height);
  ctx.font = '17px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('CONTROLS', 30, 40);
  ctx.fillText('A     D', 20, 90 )
  ctx.fillText('\u2190   \u2192', 90, 90);
}

function displayScore() {
  const scoreCanvas = document.getElementById('scoreCanvas');
  const ctx = scoreCanvas.getContext('2d');
  ctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ', 10, 30);
  ctx.fillText(score, 50, 60);
}
function resetGame() {
  score1 = 0;
 
  platformWidth = 65;
  platforms = [{
    x: canvas.width / 2 - platformWidth / 2,
    y: platformStart
  }];
 
  player.x = canvas.width / 2  - player.width / 2;
  player.y = platformStart - 70;
  player.dx = 0;
  player.dy = 0;
  
  y = platformStart;
  while (y > 0) {
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);
    do {
      x = random(1, canvas.width - 1 - platformWidth);
    } while (
      y > canvas.height / 2 && Math.abs(x - canvas.width / 2) > platformWidth / 2
    );
    platforms.push({ x, y });

   
 
  }
}


function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  player.dy += gravity;

  if (player.y < canvas.height / 2 && player.dy < 0) {
    platforms.forEach(function(platform) {
      platform.y += -player.dy;
    });

    while (platforms[platforms.length - 1].y > 0) {
      platforms.push({
        x: random(25, canvas.width - 25 - platformWidth),
        y: platforms[platforms.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))
      })
      score += 10;
      if (platformWidth <=15){
        platformWidth=15;
      }
      else if (score>= 200 && score <=201){
        platformWidth-=15;
        leftSpeed -= 2;
        rightSpeed += 2;
      }
      else if (score>= 500 && score <=501){
        platformWidth-=15;
        leftSpeed -= 2;
        rightSpeed += 2;
      }
      else if (score>=1000 && score <=1001){
        platformWidth-=15;
        leftSpeed -= 2;
        rightSpeed +=2;
      }
     

      maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 2);
    }
  }
  else {
    player.y += player.dy;
  }
  if (!keydown) {
    player.dx = 0;
  }
  player.x += player.dx;
  if (player.x + player.width < 0) {
    player.x = canvas.width;
  }
  else if (player.x > canvas.width) {
    player.x = -player.width;
  }
  else if (player.y > canvas.height){
    context.font = '40px Arial';
    context.fillStyle = 'black';
    context.fillText('GAME OVER', canvas.width/2 - 115, canvas.height/2);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText('Press "Space" to reset', canvas.width/2 - 115, canvas.height/1.50);

    document.addEventListener('keydown', function(e) {
      if (e.which === 32) {
        resetGame();
      }
      
    });
    }
  

  context.fillStyle = 'green';
  platforms.forEach(function(platform) {
    context.fillRect(platform.x, platform.y, platformWidth, platformHeight);

    if (
      player.dy > 0 &&
      prevPlayerY + player.height <= platform.y &&

      player.x < platform.x + platformWidth &&
      player.x + player.width > platform.x &&  
      player.y < platform.y + platformHeight &&
      player.y + player.height > platform.y
    ) {
      player.dy = bounceVelocity;
    }
  });

  context.fillStyle = 'yellow';
  context.fillRect(player.x, player.y, player.width, player.height);

  prevPlayerY = player.y;


  platforms = platforms.filter(function(platform) {
    return platform.y < canvas.height;
  })
  displayScore();
  tutorial();
}
x 
document.addEventListener('keydown', function(e) {
  if (e.which === 37) {
    keydown = true;
  
    player.dx = leftSpeed;

  }
  else if (e.which === 39) {
    keydown = true;
    
    player.dx = rightSpeed;
  }
  else if (e.which === 65) {
    keydown = true;
    
    player.dx = leftSpeed;
  }
  else if (e.which === 68) {
    keydown = true;
    
    player.dx = rightSpeed;
  }
});

document.addEventListener('keyup', function(e) {
  keydown = false;
});

requestAnimationFrame(loop);