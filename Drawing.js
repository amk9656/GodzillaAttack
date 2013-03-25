//Canvas stuff goes here

//CONSTANTS

//GLOBALS

function Animate()
{
	var deltaTime = calculateDeltaTime();		
	enemiesUpdate(deltaTime);
	godzillaUpdate(deltaTime);
	drawBackground();
	drawGodzilla();
	drawHelicopter();
	
	window.requestAnimFrame(Animate);		
}

function drawBackground()
{
	ctx.fillStyle="gray";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}