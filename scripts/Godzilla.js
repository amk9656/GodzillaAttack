//Godzilla's controls go here
"use strict";
//CONSTANTS
var KEYBOARD = {
	"KEY_LEFT":37,
	"KEY_UP":38,
	"KEY_RIGHT":39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

//GLOBALS
var lastTime = 0;
var keydown = [];

function Godzilla()
{
	var godzilla = {
		color: "green",
		x:230,
		y:120,
		width:75,
		height: 65,
		speed: 200,
		health:100,
		draw: function ()
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y, this.width, this.height);
		}
	};
	window.addEventListener("keydown",function(e){
		keydown[e.keyCode] = true;
	});
	window.addEventListener("keyup",function(e){
		keydown[e.keyCode] = false;
	});		
	return godzilla;
}

function godzillaUpdate(deltaTime){		
	var clampX = isClamped(godzilla.x, 0, CANVAS_WIDTH - (godzilla.width)),
	clampY = isClamped(godzilla.y, 0, CANVAS_HEIGHT - (godzilla.height));

	if (clampX == "max") {
		godzilla.x = 1;
		level.edgedWith("right");
	} else if (clampX == "min") {
		godzilla.x = CANVAS_WIDTH - godzilla.width - 1;
		level.edgedWith("left");
	} else if (clampY == "max") {
		godzilla.y = 1;
		level.edgedWith("bottom");
	} else if (clampY == "min") {
		godzilla.y = CANVAS_HEIGHT - godzilla.height - 1;
		level.edgedWith("top");
	}

	if (clampX || clampY) {
		console.log(clampX + "/" + clampY);
	}


	if(keydown[KEYBOARD.KEY_LEFT]){			
		godzilla.x -= godzilla.speed * deltaTime;
	}
	if(keydown[KEYBOARD.KEY_RIGHT]){
		godzilla.x += godzilla.speed * deltaTime;
	}
	if(keydown[KEYBOARD.KEY_UP]){
		godzilla.y -= godzilla.speed * deltaTime;
	}
	if(keydown[KEYBOARD.KEY_DOWN]){
		godzilla.y += godzilla.speed * deltaTime;
	}
	handleCollisions();
	if(godzilla.health <= 0)
	{
		console.log("You have died");
	}
}



function drawGodzilla()
{
	godzilla.draw();
}