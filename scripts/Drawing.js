//Canvas stuff goes here
"use strict";
//CONSTANTS

//GLOBALS

/*
	Function: AnimateGame()
	Desc: redraw game UI at 60 fps
*/
function AnimateGame()
{
	var deltaTime = calculateDeltaTime();	

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
	if(spawnTime > 10)
	{
		helicopter.push(new Helicopter());
		spawnTime = 0;		
	}
	helicopter.forEach(function(heli)
	{
		heli.draw(ctx);
	});
	
	// calling update functions
	update(deltaTime);
	godzillaUpdate(deltaTime);

	// calling drawing functions
	drawHealth(ctx);
	drawGodzilla();
	level.drawCurrentSection();

	window.requestAnimFrame(AnimateGame);
}

/*
 * Function: AnimateUI()
 * 
 */
function AnimateUI () {
	var deltaTime = calculateDeltaTime();

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	// ui.updateUI(deltaTime);
	ui.drawUI();

	window.requestAnimFrame(AnimateUI);
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
		if (collides(building, godzilla)) { building.destroy(); }
		if (building.powerup != null && collides(building.powerup, godzilla)) { building.powerup.consume(); };
	});
}