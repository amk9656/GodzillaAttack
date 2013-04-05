"use strict";

var KEYBOARD = {
	"KEY_LEFT":37,
	"KEY_UP":38,
	"KEY_RIGHT":39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

var lastTime = 0;
var keydown = [];

window.Godzilla = (function(){
	function Godzilla()
	{
		this.color = "green";
		this.x = 230;
		this.y = 120;
		this.width = 75;
		this.height = 65;
		this.attackWidth = 95;
		this.attackHeight = 30;
		this.speed = 200;
		this.health = 100;
	};
	
	window.addEventListener("keydown",function(e){
		keydown[e.keyCode] = true;
	});
	window.addEventListener("keyup",function(e){
		keydown[e.keyCode] = false;
	});		
	Godzilla.prototype.draw = function(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y, this.width, this.height);
	};
	
	Godzilla.prototype.update = function(deltaTime)
	{
		var clampX = isClamped(this.x, 0, CANVAS_WIDTH - (this.width)),
		clampY = isClamped(this.y, 0, CANVAS_HEIGHT - (this.height));

		if (clampX == "max") {
			this.x = 1;
			level.edgedWith("right");
		} else if (clampX == "min") {
			this.x = CANVAS_WIDTH - this.width - 1;
			level.edgedWith("left");
		} else if (clampY == "max") {
			this.y = 1;
			level.edgedWith("bottom");
		} else if (clampY == "min") {
			this.y = CANVAS_HEIGHT - this.height - 1;
			level.edgedWith("top");
		}

		if (clampX || clampY) {
			console.log(clampX + "/" + clampY);
		}


		if(keydown[KEYBOARD.KEY_LEFT]){			
			this.x -= this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_RIGHT]){
			this.x += this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_UP]){
			this.y -= this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_DOWN]){
			this.y += this.speed * deltaTime;
		}
		if(keydown[KEYBOARD.KEY_SPACE])
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - 10, this.y - (this.height/3),this.attackWidth, this.attackHeight);
			console.log(hello);
		}
		handleCollisions();
		if(this.health <= 0)
		{
			console.log("You have died");
		}

	};
	return Godzilla;
})();