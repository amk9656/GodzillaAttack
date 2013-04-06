"use strict";

window.Bullet = (function(){
	function Bullet(x,y,speed){	
	this.x = x;
	this.y = y;
	this.godzillaX = godzilla.x;
	this.godzillaY = godzilla.y;
	
	this.deltaX = godzilla.x - this.x;
	this.deltaY = godzilla.y - this.y;
	
	this.active = true;
	this.lifeTime = 10;
	this.speed = speed;
	this.velocityX = this.deltaX / speed;
	this.velocityY = this.deltaY / speed; 
	this.width = 5;
	this.height = 5;
	this.color = "#000000";
	}
	
	Bullet.prototype.inBounds = function(){
		return this.x >= 0 && this.x <= CANVAS_WIDTH && this.y >= 0 &&this.y <= CANVAS_HEIGHT;
	};

	Bullet.prototype.update = function(deltaTime){		
		// this.x += (this.godzillaX - this.x)*deltaTime;
		// this.y += (this.godzillaY - this.y)*deltaTime;
		this.x += this.velocityX * deltaTime;
		this.y += this.velocityY * deltaTime;
		this.active = this.active && this.inBounds();
	};
	
	Bullet.prototype.draw = function(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	return Bullet; 
	})();