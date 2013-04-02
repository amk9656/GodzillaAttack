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

	update(deltaTime);
	godzillaUpdate(deltaTime);

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	level.getSection(level.currentSection).draw();
	drawGodzilla();
	if(spawnTime > 10)
	{
		helicopter.push(new Helicopter());
		spawnTime = 0;		
	}
	helicopter.forEach(function(heli)
		{
			heli.draw(ctx);
			
		});
	drawHealth(ctx);
	window.requestAnimFrame(Animate);
	
}

function drawHealth(ctx)
{
	ctx.fillStyle = "#000000";
	ctx.font = "bold 16px Arial, sans-serif";
	var healthText = "Health: " + godzilla.health;
	var textSize = ctx.measureText(healthText);
	var xCoord = (CANVAS_WIDTH / 2) - (textSize.width / 2);
	ctx.fillText(healthText, xCoord, 30);
}

function handleCollisions(){
	helicopter.forEach(function(heli)
	{
		if(collides(heli, godzilla))
		{
			console.log(godzilla.health);
			godzilla.health -= 5;
			heli.explode();	
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