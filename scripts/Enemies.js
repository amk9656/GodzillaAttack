//Enemy scripts go here
"use strict";
//CONSTANTS

//GLOBALS

window.Helicopter = (function(){
	function Helicopter()
	{
		this.directionTime = 2.5;
		this.randomCounter = 0;
		this.active = true;
		this.color = "red";
		this.x = Math.round(Math.random()*CANVAS_WIDTH + 0);
		this.y = Math.round(Math.random()*CANVAS_HEIGHT + 0);
		this.width = 48;
		this.height = 43;

		this.rotation = 0;
		this.speed = 50;		
	};

	Helicopter.prototype.draw = function(ctx)
	{
		if (!images["enemyImage"]) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y, this.width, this.height);
		} else {
			ctx.save();
			ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
			ctx.rotate(this.rotation);
			ctx.drawImage(images["enemyImage"], -this.width / 2, -this.height, this.width, this.height);
			ctx.restore();
		}
	};

	Helicopter.prototype.shoot = function() {
		heliBullets.push(new Bullet(this.x + this.width, this.y + this.height, 2));
	};
	
	Helicopter.prototype.update = function(deltaTime) {

		//	edging screen
		var clampX = isClamped(this.x, 0, CANVAS_WIDTH - (this.width)),
		clampY = isClamped(this.y, 0, CANVAS_HEIGHT - (this.height));

		if (clampX == "max") {
			this.x = 1;
		} else if (clampX == "min") {
			this.x = CANVAS_WIDTH - this.width - 1;
		} else if (clampY == "max") {
			this.y = 1;
		} else if (clampY == "min") {
			this.y = CANVAS_HEIGHT - this.height - 1;
		}
		
		//	change of direction
		this.directionTime += deltaTime;

		if(this.directionTime > 3) {
			this.randomCounter = Math.round(Math.random()*5+1);
			this.directionTime = 0;
		}
		if(this.randomCounter >= 1 && this.randomCounter < 2) {
			this.x -= this.speed * deltaTime;
			this.rotation = 1.5 * Math.PI;
		} else if(this.randomCounter >= 2 && this.randomCounter < 3) {
			this.x += this.speed * deltaTime;
			this.rotation = Math.PI / 2;
		} else if(this.randomCounter >= 3 && this.randomCounter < 4) {
			this.y -= this.speed * deltaTime;
			this.rotation = 0;
		} else if(this.randomCounter >= 4) {
			this.y += this.speed * deltaTime;
			this.rotation = Math.PI;
		}


		handleCollisions();
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
	}
	
	Helicopter.prototype.explode = function() {
		if (this.active) {
			this.active = false;
			godzilla.health -= 15;
		};
	};

	return Helicopter;
})();