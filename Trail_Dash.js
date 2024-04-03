const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let jumpHeight = -10.5;
let groundWidth = 1000;
let groundHeight = 100;

let obstacleArray = [];
let obstacleHeight = 70;
let obstacleWidth = 30;

let obstacleX = 1000;
let obstacleY = 282;

let velocityX = -8;
let velocityY = 0;

let score = 0;
let ground = {
    x: 0,
    y: canvas.height - groundHeight
};

const player = {
    width: 42,
    height: 62,
    x: 100,
    y: 250,
    dx: 0,
    dy: 0
};

let gravity = 0.5;
let prevPlayerY = player.y;
let dead = false;
function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (dead === false){
        score += 1;
        
    }
    

    player.dy += gravity;
    player.y += player.dy;


    context.fillStyle = 'green';
    context.fillRect(ground.x, ground.y, groundWidth, groundHeight);


    context.fillStyle = 'blue';
    context.fillRect(player.x, player.y, player.width, player.height);
    function displayScore() {
        const scoreCanvas = document.getElementById('scoreCanvas');
        const ctx = scoreCanvas.getContext('2d');
        ctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ', 10, 30);
        ctx.fillText(score, 10, 50);
      }
      displayScore();
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            player.x = -100


        }
        
        obstacle.x += velocityX;
        context.fillStyle = 'red';
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
    if (player.x < 0) {
        gameOver();
    }

    prevPlayerY = player.y;
    if (player.dy > 0 &&
        player.y + player.height >= ground.y &&
        player.x < ground.x + groundWidth &&
        player.x + player.width > ground.x) {

        player.y = ground.y - player.height;
        player.dy = 0;
    }
}

function placeObstacle() {
    let obstacle = {
        x: obstacleX,
        y: obstacleY,
        height: obstacleHeight,
        width: obstacleWidth
    };
    obstacleArray.push(obstacle);
    if (dead === false){
        
        velocityX -= 0.5;
    }
    
    if (obstacleArray.length > 5) {
        obstacleArray.shift();
        
    }
}

document.addEventListener('keydown', function(e) {
    if (e.which === 87 && player.dy == 0) {
        player.dy = jumpHeight;
    } else if (e.which === 32 && player.dy == 0) {
        player.dy = jumpHeight;
    }
});

function gameOver() {
    context.clearRect(ground.x, ground.y, ground.width, ground.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    dead = true;
    context.font = '40px Arial';
    context.fillStyle = 'black';
    context.fillText('GAME OVER', canvas.width / 2 - 115, canvas.height / 2);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText('Press "Space" to reset', canvas.width / 2 - 115, canvas.height / 1.50);

    document.removeEventListener('keydown', resetHandler); 
    document.addEventListener('keydown', resetHandler);
    cancelAnimationFrame(loop);
    return;
}

function resetGame() {
  obstacleArray = []; 
  player.x = 100; 
  player.y = 250;
  player.dy = 0; 
  score = 0;  
  velocityX = -8; 
  gravity = 0.5;
  dead = false;

          
    document.removeEventListener('keydown', resetHandler); 
    
}

function resetHandler(e) {
    if (e.which === 32) { 
        resetGame();
    }
}

setInterval(placeObstacle, 1000 );



requestAnimationFrame(loop);