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

	// ctx.fillStyle="gray";
	// ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
	// calling update functions
	update(deltaTime);
	godzillaUpdate(deltaTime);

	// calling drawing functions
	level.drawCurrentSection();
	godzilla.draw();
	if(spawnTime > 10)
	{
		helicopter.push(new Helicopter());
		spawnTime = 0;		
	}
	helicopter.forEach(function(heli) {
		heli.draw(ctx);
	});
	ui.drawUI();

	threading.push(window.requestAnimFrame(AnimateGame));
}

/*
 * Function: AnimateUI()
 * 
 */
function AnimateUI () {
	var deltaTime = calculateDeltaTime();

	// ui.updateUI(deltaTime);
	ui.drawUI();

	threading.push(window.requestAnimFrame(AnimateUI));
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