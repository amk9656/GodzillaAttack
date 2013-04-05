"use strict";
window.UI = (function() {
	function UI() {
		this.UIState = "startGame";
		this.clickableShapes = [];
		this.animatableShapes = [];

		var canvas = document.querySelector("canvas");
		canvas.addEventListener("mousemove", function(evt) {
			var mouse = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };
			document.body.style.cursor = "default";
			// mousemove events
			ui.clickableShapes.forEach(function(shape) {
				if (collides(mouse, shape)) {
					//	cursor
					document.body.style.cursor = "pointer";
				}
			});
		});
		canvas.addEventListener("mouseup", function(evt) {
			var mouse = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };

			// mouseup events
			ui.clickableShapes.forEach(function(shape) {
				if (collides(mouse, shape)) {
					shape.callback();
				};
			});
		});
	}

	UI.prototype.drawUI = function() {
		switch(this.UIState) {
			case "startGame":
				createStartGameUI();
				break;
			case "game":
				createGameUI();
				break;
			case "endGame":
				createEndGameUI();
				break;
			case "credit":
				createCreditUI();
				break;
		}
	};

	UI.prototype.switchUI = function(switchTo) {
		if (this.UIState != switchTo) {
			this.UIState = switchTo;
		}
	};

	UI.prototype.updateUI = function(dt) {

	};

	function createStartGameUI() {
		var gradient, startGameBtn, creditBtn;

		ctx.fillStyle="gray";
		ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

		startGameBtn = { type: "button", text: "start", x: 170, y: 300, width: 300, height:50, callback: function() {
			ui.switchUI("game");
			if (level == null) { initGame(); };
		} };
		ui.clickableShapes.push(startGameBtn);
		creditBtn = { type: "button", text: "credit", x: 170, y: 380, width: 300, height:50, callback: function() { ui.switchUI("credit"); } };
		ui.clickableShapes.push(creditBtn);

		gradient = ctx.createLinearGradient(0, 0, 50, 50);
		gradient.addColorStop(0, "rgb(201,222,150)");
		gradient.addColorStop("0.44", "rgb(138,182,107)");
		gradient.addColorStop(1, "rgb(57,130,53)");

		ctx.font = "30px Georgia";
		ctx.strokeStyle = "black";
		ctx.lineWidth = "2px";
		ctx.shadowColor = "#666";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 1;

		// start game btn
		ctx.fillStyle = gradient;
		ctx.fillRect(startGameBtn.x, startGameBtn.y, startGameBtn.width, startGameBtn.height);
		ctx.strokeRect(startGameBtn.x, startGameBtn.y, startGameBtn.width, startGameBtn.height);

		// credit btn
		ctx.fillRect(creditBtn.x, creditBtn.y, creditBtn.width, creditBtn.height);
		ctx.strokeRect(creditBtn.x, creditBtn.y, creditBtn.width, creditBtn.height);

		// start
		ctx.fillStyle = "black";
		ctx.shadowColor = "transparent";
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillText(startGameBtn.text, startGameBtn.x + 120, startGameBtn.y + 35);

		// credit
		ctx.fillText(creditBtn.text, creditBtn.x + 110, creditBtn.y + 35);
	};

	function createGameUI() {
		var healthGradient, healthBar;

		healthBar = { type: "shape", x: 0, y: 0, width: CANVAS_WIDTH, height: 15 };

		ctx.fillStyle = healthGradient;
		ctx.strokeStyle = "black";
		ctx.lineWidth = "2px";

		ctx.fillRect(healthBar.x, healthBar.y, healthBar.width * (godzilla.health / 100), healthBar.height);
		ctx.strokeRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
	};

	function createCreditUI() {
		
	};

	function createEndGameUI() {

	};

	return UI;
})();