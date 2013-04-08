//Canvas stuff goes here
"use strict";
//CONSTANTS
var IMAGE_SOURCES = {
	playerImage: "godzilla.png",
	tilesImage: "tiles.png",
	enemyImage: "tank.png",
	buildingsImage: "houses.png"
};

//GLOBALS
var spawnTime = 0, shootTime = 0, threadings = {}, lastTime = 0;

/*
 *	Function: AnimateGame()
 *	Desc: redraw game UI at 60 fps
 *
 */
function AnimateGame()
{
	var deltaTime = calculateDeltaTime();	

	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

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

	threadings["Game"] = window.requestAnimFrame(AnimateGame);
}

/*
 * Function: AnimateUI()
 * 
 */
function AnimateUI () {
	var deltaTime = calculateDeltaTime();

	// document.querySelector("#canvas").width = CANVAS_WIDTH;
	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	// ui.updateUI(deltaTime);
	ui.drawUI();

	threadings["UI"] = window.requestAnimFrame(AnimateUI);
}

function updateGame(deltaTime) {			
	if(helicopters.length < 3) {
		spawnTime += deltaTime;
	}

	helicopters.forEach(function(heli)
	{
		heli.update(deltaTime);

		shootTime += deltaTime;
		if(shootTime >= 4)
		{
			heli.shoot();
			shootTime = 0;
		}
	});
	helicopters = helicopters.filter(function(heli) {
		return heli.active;
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
 function endGame () {
 	var deltaTime = calculateDeltaTime();

 	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	ui.drawUI();

	godzilla = null;
	helicopters = [];
	heliBullets = [];
	level = null;

	threadings["endGame"] = window.requestAnimFrame(endGame);
 }

/*
 *
 *
 *
 */
function loadImages(){
	var numLoadedImages = 0, numImages = 0;		
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
	helicopters.forEach(function(heli) {
		if(collides(heli, godzilla)) {
			heli.explode();	
		}		
	});
	heliBullets.forEach(function(bullet) {
		if(collides(bullet, godzilla)) {
			bullet.explode();
		}
	});
	level.getSection(level.currentSection).buildings.forEach(function(building) {
		if (collides(building, godzilla)) { level.getSection(level.currentSection).destroyBuilding(building); }
		if (building.powerup != null && collides(building.powerup, godzilla)) { building.powerup.consume(); };
	});
}
