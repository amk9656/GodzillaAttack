//Canvas stuff goes here
"use strict";
//CONSTANTS
var IMAGE_SOURCES = {
	playerImage: "godzilla.png",
	enemyImage: "",
	buildingImage: ""
};

//GLOBALS
var spawnTime = 0, shootTime = 0;

/*
 *	Function: AnimateGame()
 *	Desc: redraw game UI at 60 fps
 *
 */
function AnimateGame()
{
	var deltaTime = calculateDeltaTime();	

	//	calling updating functions
	updateGame(deltaTime);
	godzilla.update(deltaTime);

	//	calling drawing functions
	level.drawCurrentSection();
	godzilla.draw();
	ui.drawUI();
	if(spawnTime > 10)
	{
		helicopters.push(new Helicopter());
		spawnTime = 0;		
	}
	helicopters.forEach(function(heli) {
		heli.draw(ctx);
	});
	heliBullets.forEach(function(bullet){
		bullet.draw(ctx);
	});

	window.requestAnimFrame(AnimateGame);
}

/*
 * Function: AnimateUI()
 * 
 */
function AnimateUI () {
	var deltaTime = calculateDeltaTime();

	// ui.updateUI(deltaTime);
	ui.drawUI();

	window.requestAnimFrame(AnimateUI);
}

function updateGame(deltaTime) {			
	if(helicopters.length < 3)
	{
		spawnTime += deltaTime;
	}
	helicopters.forEach(function(heli)
	{
		heli.update(deltaTime);
	});
	helicopters = helicopters.filter(function(heli) {
		return heli.active;
	});
	
	helicopters.forEach(function(heli)
	{
		shootTime += deltaTime;
		if(shootTime >= 4)
		{
			console.log(heliBullets);
			shoot(heli.x,heli.y);
			shootTime = 0;
		}
	});
	
	heliBullets.forEach(function(bullet){
		bullet.update(deltaTime);
	});
	
	heliBullets = heliBullets.filter(function(bullet){
		return bullet.active;
	});
}

/*
 *
 *
 *
 */
function loadImages(){
	var numLoadedImages = 0;
	var numImages = 0;		
	for (var imageName in IMAGE_SOURCES){
		numImages++;
		}
		for(var imageName in IMAGE_SOURCES){
			console.log("Sarted loading " + imageName);
			images[imageName] = new Image(); 
			images[imageName].src = "images/" + IMAGE_SOURCES[imageName];
			
			images[imageName].onload = function(){
			console.log(this.src + " load complete");
			if(++numLoadedImages >= numImages){
				console.log("Done loading images");
				init(); 
			}
		}; 
	} 
} 	

/*
 *
 *
 *
 */
function handleCollisions(){
	helicopters.forEach(function(heli)
	{
		if(collides(heli, godzilla))
		{
			console.log(godzilla.health);
			godzilla.health -= 5;
			heli.explode();	
		}		
	});
	heliBullets.forEach(function(bullet)
	{
		if(collides(bullet, godzilla))
		{
			godzilla.health -=5;
			bullet.active = false;
		}
	});
	level.getSection(level.currentSection).buildings.forEach(function(building)
	{		
		if (collides(building, godzilla)) { building.destroy(); }
		if (building.powerup != null && collides(building.powerup, godzilla)) { building.powerup.consume(); };
	});
}
