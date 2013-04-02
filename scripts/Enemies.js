//Enemy scripts go here
"use strict";
//CONSTANTS

//GLOBALS
var lastTime = 0;

window.Helicopter = (function(){
	function Helicopter()
	{
		this.directionTime = 2.5;
		this.randomCounter = 0;
		this.active = true;
		this.color = "red";
		this.x = Math.round(Math.random()*CANVAS_WIDTH + 0);
		this.y = Math.round(Math.random()*CANVAS_HEIGHT + 0);
		this.width = 40;
		this.height = 40;
		this.speed = 50;		
	};
	Helicopter.prototype.draw = function(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y, this.width, this.height);
	};		
	
	Helicopter.prototype.update = function(deltaTime)
	{
	var clampX = isClamped(this.x, 0, CANVAS_WIDTH - (this.width)),
	clampY = isClamped(this.y, 0, CANVAS_HEIGHT - (this.height));

	if (clampX == "max") {
		this.x = 1;
		//level.edgedWith("right");
	} else if (clampX == "min") {
		this.x = CANVAS_WIDTH - this.width - 1;
		//level.edgedWith("left");
	} else if (clampY == "max") {
		this.y = 1;
		//level.edgedWith("bottom");
	} else if (clampY == "min") {
		this.y = CANVAS_HEIGHT - this.height - 1;
		//level.edgedWith("top");
	}
		
		this.directionTime += deltaTime;
		
		if(this.directionTime > 3)
		{
			this.randomCounter = Math.round(Math.random()*5+1);
			this.directionTime = 0;
		}
		if(this.randomCounter >= 1 && this.randomCounter < 2)
		{
			this.x -= this.speed * deltaTime;
		}
		if(this.randomCounter >= 2 && this.randomCounter < 3)
		{
			this.x += this.speed * deltaTime;
		}
		if(this.randomCounter >= 3 && this.randomCounter < 4)
		{
			this.y -= this.speed * deltaTime;
		}
		if(this.randomCounter >= 4)
		{
			this.y += this.speed * deltaTime;
		}
		handleCollisions();
		this.active = this.active;
	};
	
	function edgeHeli(side) {
		switch(side) {
			case "top":
			this.y = CANVAS_HEIGHT - this.height - 1;
			break;
			case "bottom":
			this.y = 1;
			break;
			case "left":
			this.x = CANVAS_WIDTH - this.width - 1;
			break;
			case "right":
			this.x = 1;
			break;
			}
		clampHeli();
		}
	
	Helicopter.prototype.explode = function()
	{
		this.active = false;
	};
	return Helicopter;
})();