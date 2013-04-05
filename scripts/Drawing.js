//Canvas stuff goes here
"use strict";
//CONSTANTS

//GLOBALS

/*
	Function: AnimateGame()
	Desc: redraw game screen at 60 fps
*/
function AnimateGame()
{
	// title screen
	if (level != null) {
		Screen.drawScreen("startGame");
	} else {

	}

	var deltaTime = calculateDeltaTime();	

	update(deltaTime);
	godzillaUpdate(deltaTime);

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
	

	// calling drawing functions
	drawHealth(ctx);
	Screen.drawScreen();
	drawGodzilla();
	level.drawCurrentSection();

	window.requestAnimFrame(AnimateGame);
}

/*
 * Function: AnimateScreen()
 * 
 */
function AnimateScreen () {
	var deltaTime = calculateDeltaTime();

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	Screen.updateScreen(deltaTime);
	Screen.drawScreen();

	window.requestAnimFrame(AnimateScreen);
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
	
	level.getSection(level.currentSection).bScreenldings.forEach(function(bScreenlding)
	{		
		if (collides(bScreenlding, godzilla)) { bScreenlding.destroy(); }
		if (bScreenlding.powerup != null && collides(bScreenlding.powerup, godzilla)) { bScreenlding.powerup.consumed(); };
	});
}