//Godzilla's controls go here

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
					draw: function ()
					{
						ctx.fillStyle = this.color;
						ctx.fillRect(this.x,this.y, this.width, this.height);
					}
		};
		window.addEventListener("keydown",function(e){
			console.log("keydown=" + e.keyCode);
			keydown[e.keyCode] = true;
		});
		window.addEventListener("keyup",function(e){
			console.log("keyup=" + e.keyCode);
			keydown[e.keyCode] = false;
		});
		
		
		
		return godzilla;
	}
	
	function calculateDeltaTime(){
		var now,fps;
		now = (+new Date);
		fps = 1000 / (now - lastTime);
		fps = clamp(fps, 12, 60);
		lastTime = now;
		return 1/fps;
	}
	
	
	
	function animateGodzilla()
	{
		var deltaTime = calculateDeltaTime();
		
		update(deltaTime);
		drawBackground();
		drawSelf();
		window.requestAnimFrame(animateGodzilla);
		
	}
	
	function update(deltaTime){		
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
	}
	
	function drawSelf()
	{
		godzilla.draw();
	}