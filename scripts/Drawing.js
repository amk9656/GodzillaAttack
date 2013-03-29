//Canvas stuff goes here
"use strict";
//CONSTANTS

//GLOBALS

/*
	Function: Animate()
	Desc: redraw screen at 60 fps
*/
function Animate()
{
	var deltaTime = calculateDeltaTime();	

	enemiesUpdate(deltaTime);
	godzillaUpdate(deltaTime);

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	level.getSection(level.currentSection).draw();
	drawGodzilla();
	drawHelicopter();
	
	window.requestAnimFrame(Animate);
	
}

function handleCollisions(){
	helicopter.forEach(function(heli)
	{
		if(collides(heli, godzilla))
		{
			console.log(godzilla.health);
			godzilla.health -= 5;
		}
	});
	
	level.getSection(level.currentSection).buildings.forEach(function(building)
	{
		
		if(collides(building, godzilla))
		{
			console.log("Building destroyed");
		}
	});
}