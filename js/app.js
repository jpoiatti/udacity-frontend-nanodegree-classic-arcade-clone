// Enemies our player must avoid
class Enemy {
    constructor(coordX, coordY, maxSpeed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = coordX;
        this.y = coordY;
        this.speed = maxSpeed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // While enemy position is lower than 520 in X axis, it
        // will move to the right.
        // The enemy position is updated multiplying speed  * dt
        // and adding that to the initial position (this.x)
        if (this.x < 520) {
            this.x += this.speed * dt;
        }
        // If enemy crosses right border (x > 505px [since enemy 
        // sprite width has 101px]), reset x position to 0;
        if (this.x > 505) {
            this.x = -171;
            this.speed = setSpeed(Math.floor(Math.random() * Math.floor(300)) + 100);
        }
        // Collision detection of enemies with player
        if (player.x < this.x + 78 && player.x + 80 > this.x &&
            player.y < this.y + 61 && 60 + player.y > this.y) {
            enemyCollision.play();
            player.reset();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(coordX, coordY) {
        this.x = coordX;
        this.y = coordY;
        this.sprite = 'images/char-horn-girl.png';
        this.score = 0;
        this.level = 1;
    }
    // Update the player's position, required method for game
    update() {
        
    }

    // Update the level data on-screen.
    updateLevelScr() {
        // Gets the gameLevel id element from HTML markup
        let gameLevelElement = document.getElementById('gameLevel');
        // Updates the value of the first child node in the HTML element
        // where id = gameLevel to the current value of 
        // level variable.
        gameLevelElement.firstChild.nodeValue = this.level;
    }
    
    
    // Increases game difficulty by adding more enemies according 
    // to the level the player currently is in.
    increaseGameDifficulty() {
        switch (this.level) {
            case 2:
                allEnemies.push(enemy4);
                break;
            case 3:
                allEnemies.push(enemy5);
                break;
            case 4:
                allEnemies.push(enemy6);
                break;
        }
    }

    // Update the player status data and on-screen information.
    updateScoreScr() {
        // Gets the gameScore id element from HTML markup
        let scoreElement = document.getElementById('gameScore');
        // Updates the value of the first child node in HTML element
        // to the current value of score variable.
        scoreElement.firstChild.nodeValue = this.score;
        
    }
    
    

    // Resets player position and status if player collides with enemy
    reset() {
        // Resets position
        this.x = 205;
        this.y = 410;
        // Resets level
        this.level = 1;
        // Resets score
        this.score = 0;
        // Calls the functions to update score and level on-screen
        this.updateScoreScr();
        this.updateLevelScr();
        // Resets allEnemies array back to initial 
        // state with 3 enemies
        allEnemies.splice(3,3);
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handle the keyboard input to control the player
    // and check for collisions after each input
    handleInput(evt) {
        //
        switch (evt) {
            case 'left':
                this.x -= 40;
                break;
            case 'right':
                this.x += 40;
                break;
            case 'up':
                this.y -= 40;
                break;
            case 'down':
                this.y += 40;
                break;
        }

        // Prevents player from crossing canvas limits
        // X axis
        if (this.x > 440) {
            this.x += -40;
        }
        if (this.x < 0) {
            this.x += 40;
        }
        // Y axis
        if (this.y > 410) {
            this.y += -40;
        }
        
        // Checks if player has achieved goal line (the player Y axis 
        // position is less than 10 pixels)
        if (this.y < 10) {
            // Plays level finish audio
            audioLevelFinish.play();
            // Sets player's position back to start
            this.x = 205;
            this.y = 410;
            // Increment the current score by 10 for completing the level
            this.score += 10;
            // Increment current level by 1
            this.level++;
            // Calls function to update player's status on-screen
            this.updateScoreScr();
            // Calls function to update game level on-screen
            this.updateLevelScr();
            // Calls function to update game difficulty
            this.increaseGameDifficulty();
        }

    }
}

// Function to generate random speed
function setSpeed(baseSpeed) {
    return Math.floor(Math.random() + Math.floor(baseSpeed));
}

// Now instantiate your objects.
let enemy1 = new Enemy(-171, 70, setSpeed(300));
let enemy2 = new Enemy(-171, 150, setSpeed(140));
let enemy3 = new Enemy(-171, 230, setSpeed(250));
let enemy4 = new Enemy(-171, 150, setSpeed(500));
let enemy5 = new Enemy(-171, 230, setSpeed(600));
let enemy6 = new Enemy(-171, 70, setSpeed(800));


// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
let player = new Player(205, 410);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.which]);
});

// Audios
// Attribution: https://gamesounds.xyz
let audioLevelFinish = new Audio('../sounds/levelFinish.wav');
let enemyCollision = new Audio('../sounds/enemyColision.wav');
