//	Godzilla script goes here
"use strict";

// CONSTANTS
var KEYBOARD = {
	"KEY_LEFT":37,
	"KEY_UP":38,
	"KEY_RIGHT":39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

// GLOBALS
var keydown = [];

window.Godzilla = (function(){
	function Godzilla() {
		this.color = "green";
		this.x = 230;
		this.y = 120;
		this.width = 32;
		this.height = 32;
		this.spriteX = 0;
		this.spriteY = 0;
		this.speed = 200;
		this.health = 100;
		this.score = 0;
		this.isDead = false;

		this.attackWidth = 95;
		this.attackHeight = 30;

		window.addEventListener("keydown",function(e){
			keydown[e.keyCode] = true;
		});
		window.addEventListener("keyup",function(e){
			keydown[e.keyCode] = false;
		});
	};

	Godzilla.prototype.draw = function() {
		if (!images["playerImage"]) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y, this.width, this.height);
		} else {
			ctx.drawImage(images["playerImage"], this.spriteX, this.spriteY, 32, 32, this.x, this.y, this.width, this.height);
		}
	};

	Godzilla.prototype.edge = function() {
		var clampX = isClamped(this.x, 0, CANVAS_WIDTH - this.width),
		clampY = isClamped(this.y, 0, CANVAS_HEIGHT - this.height);

		if (clampX == "max") {
			if(level.edgedWith("right")) {
				this.x = this.width / 2;
			}
		} else if (clampX == "min") {
			if(level.edgedWith("left")) {
				this.x = CANVAS_WIDTH - this.width;
			}
		} else if (clampY == "max") {
			if(level.edgedWith("bottom")) {
				this.y = this.height / 2;
			}
		} else if (clampY == "min") {
			if(level.edgedWith("top")) {
				this.y = CANVAS_HEIGHT - this.height;
			}
		}
	};

	Godzilla.prototype.clamp = function() {
		this.x = clamp(this.x, 0, CANVAS_WIDTH - this.width);
		this.y = clamp(this.y, 0, CANVAS_HEIGHT - this.height);
	};
	
	Godzilla.prototype.update = function(deltaTime) {
		if(keydown[KEYBOARD.KEY_LEFT]){
			this.spriteX = 0;	
			this.x -= this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_RIGHT]){
			this.spriteX = 32;
			this.x += this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_UP]){
			this.spriteY = 32;
			this.y -= this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_DOWN]){
			this.spriteY = 0;
			this.y += this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_SPACE])
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - 10, this.y - (this.height/3),this.attackWidth, this.attackHeight);
			console.log(hello);
		}

		this.edge();
		handleCollisions();

		if(this.health <= 0 && !this.isDead) {
			this.isDead = true;
			ui.switchUI("endGame");
			endGame();
		} else if (this.health >= 100 && !this.isDead) {
			this.health = 100;
		}

	};

	return Godzilla;
})();