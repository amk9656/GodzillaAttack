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
		y:420,
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
	godzilla.x = clamp(godzilla.x, 0, CANVAS_WIDTH - (godzilla.width));
	godzilla.y = clamp(godzilla.y, 0, CANVAS_HEIGHT - (godzilla.height));

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
}

function drawGodzilla()
{
	godzilla.draw();
}