let gameLevel = 0;
let speedThershold = 500;
let increaseEnemySpeed = 150
let playerSpeedIncrement = 100;
const playerPosX = 200;
const playerPosY = 380;
const stepX = 50;
const stepY = 30;
var enemySpeed;


$(document).ready(function(){
    $('#gameLevel').text(gameLevel);
});
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Once the Enemy reached the end of the screen, again place the enemy at start of the screen with Random speed increment.
    if (this.x > 500) {
        this.x = -150;
        this.speed = increaseEnemySpeed + Math.floor(Math.random() * speedThershold);
    }

    // condition check for the player & enemy collision
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200; // Reset the player X position
        player.y = 400; // Reset the player Y position
        gameLevel = 0; // Reset the Game Level to Zero
        $('#gameLevel').text(gameLevel); 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};

// Method to update Player's position on the screen.
Player.prototype.update = function(dt) {
     if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = playerPosX;
        this.y = playerPosY;
        gameLevel++;
        $('#gameLevel').text(gameLevel);
        if(gameLevel >= 10) {
            gameLevel = 0;
            alert("Congrats !! You have completed the level: " + gameLevel + " Refresh Page to Play again");
            $('#gameLevel').text(gameLevel);
        }
    } 
};

// Method to Render Player Image on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to Key movement for the Player image.
Player.prototype.handleInput = function(arrowKey) {
    switch(arrowKey){
        case 'left':
            this.x -= this.speed + stepX;
            break;
        case 'right':
            this.x += this.speed + stepX;
            break;
        case 'up':
            this.y -= this.speed + stepY;
            break;
        case 'down':
            this.y += this.speed + stepY;
            break;

    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [55, 140, 220];
var playerSpeed = 50;
var player = new Player(playerPosX, playerPosY, playerSpeed);
var enemy;
increaseEnemySpeed = 100;
enemyPosition.forEach(function(posY) {
    enemySpeed = increaseEnemySpeed + Math.floor(Math.random() * speedThershold);
    enemy = new Enemy(0, posY, enemySpeed);
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
