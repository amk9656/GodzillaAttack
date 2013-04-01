//Enemy scripts go here
"use strict";
//CONSTANTS

//GLOBALS
var lastTime = 0;
var directionTime = 0;
var randomCounter = 0;
window.Helicopter = (function(){
	function Helicopter()
	{
		this.active = true;
		this.color = "red";
		this.x = 300;
		this.y = 300;
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
		this.x = clamp(this.x, 0, CANVAS_WIDTH - (this.width));
		this.y = clamp(this.y, 0, CANVAS_HEIGHT - (this.height));
		directionTime += deltaTime;
		if(directionTime > 3)
		{
			randomCounter = Math.round(Math.random()*5+1);
			directionTime = 0;
		}
		if(randomCounter >= 1 && randomCounter < 2)
		{
			this.x -= this.speed * deltaTime;
		}
		if(randomCounter >= 2 && randomCounter < 3)
		{
			this.x += this.speed * deltaTime;
		}
		if(randomCounter >= 3 && randomCounter < 4)
		{
			this.y -= this.speed * deltaTime;
		}
		if(randomCounter >= 4)
		{
			this.y += this.speed * deltaTime;
		}
		handleCollisions();
		this.active = this.active;
	};
	Helicopter.prototype.explode = function()
	{
		this.active = false;
	};
	return Helicopter;
})();