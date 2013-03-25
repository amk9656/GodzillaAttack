//Enemy scripts go here

//CONSTANTS

//GLOBALS
var lastTime = 0;
var directionTime = 0;
var randomCounter = 0;
function Helicopter()
{
	var helicopter = {
				color: "red",
				x:300,
				y:300,
				width:40,
				height:40,
				speed:50,
				draw: function()
				{
					ctx.fillStyle = this.color;
					ctx.fillRect(this.x,this.y, this.width, this.height);
				}
	};
	return helicopter;
}

function calculateDeltaTime()
{
	var now,fps;
	now = (+new Date);
	fps = 1000 / (now - lastTime);
	fps = clamp(fps, 12, 60);
	lastTime = now;
	return 1/fps;
}

function drawHelicopter()
{
	helicopter.draw();
}

function enemiesUpdate(deltaTime)
{
	helicopter.x = clamp(helicopter.x, 0, CANVAS_WIDTH - (helicopter.width));
	helicopter.y = clamp(helicopter.y, 0, CANVAS_HEIGHT - (helicopter.height));
	directionTime += deltaTime;
	if(directionTime > 3)
	{
		randomCounter = Math.round(Math.random()*5+1);
		directionTime = 0;
	}
	if(randomCounter >= 1 && randomCounter < 2)
	{
		helicopter.x -= helicopter.speed * deltaTime;
	}
	if(randomCounter >= 2 && randomCounter < 3)
	{
		helicopter.x += helicopter.speed * deltaTime;
	}
	if(randomCounter >= 3 && randomCounter < 4)
	{
		helicopter.y -= helicopter.speed * deltaTime;
	}
	if(randomCounter >= 4)
	{
		helicopter.y += helicopter.speed * deltaTime;
	}
	//console.log(randomCounter);
	//console.log(directionTime);
	//console.log(helicopter.x);
	//console.log(helicopter.y);
}