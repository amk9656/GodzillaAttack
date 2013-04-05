"use strict";
window.UI = (function() {
	function UI() {
		this.UIState = "startGame";
		this.clickableShapes = [];

		var canvas = document.querySelector("canvas");
		canvas.addEventListener("mousemove", function(evt) {
			var click = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };
			// mousemove events
			ui.clickableShapes.forEach(function(shape) {
				if (collides(click, shape)) {
					
				};
			});
		});
		canvas.addEventListener("mouseup", function(evt) {
			var click = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };

			// mouseup events
			ui.clickableShapes.forEach(function(shape) {
				if (collides(click, shape)) {
					shape.callback();
				};
			});
		});
	}

	UI.prototype.drawUI = function() {
		switch(this.UIState) {
			case "startGame":
				this.createStartGameUI();
				break;
			case "game":
				this.createGameUI();
				break;
			case "endGame":
				this.createEndGameUI();
				break;
			case "credit":
				this.createCreditUI();
				break;
		}
	};

	UI.prototype.switchUI = function(switchTo) {
		this.UIState = switchTo;
	};

	UI.prototype.updateUI = function(dt) {

	};

	UI.prototype.createStartGameUI = function() {
		var gradient, startGameBtn, creditBtn;

		startGameBtn = { type: "button", text: "start", x: 170, y: 300, width: 300, height:50, callback: function() {
			ui.switchUI("game");
			initGame();
		} };
		this.clickableShapes.push(startGameBtn);
		creditBtn = { type: "button", text: "credit", x: 170, y: 380, width: 300, height:50, callback: function() { ui.switchUI("credit"); } };
		this.clickableShapes.push(creditBtn);

		gradient = ctx.createLinearGradient(0, 0, 0, 50);
		gradient.addColorStop(0, "rgb(201,222,150)");
		gradient.addColorStop("0.44", "rgb(138,182,107)");
		gradient.addColorStop(1, "rgb(57,130,53)");

		ctx.font = "30px Georgia";
		ctx.strokeStyle = "black";
		ctx.lineWidth = "2px";

		// start game
		ctx.fillStyle = gradient;
		ctx.fillRect(startGameBtn.x, startGameBtn.y, startGameBtn.width, startGameBtn.height);
		ctx.strokeRect(startGameBtn.x, startGameBtn.y, startGameBtn.width, startGameBtn.height);
		ctx.fillStyle = "black";
		ctx.fillText(startGameBtn.text, startGameBtn.x + 120, startGameBtn.y + 35);

		// credit
		ctx.fillStyle = gradient;
		ctx.fillRect(creditBtn.x, creditBtn.y, creditBtn.width, creditBtn.height);
		ctx.strokeRect(creditBtn.x, creditBtn.y, creditBtn.width, creditBtn.height);
		ctx.fillStyle = "black";
		ctx.fillText(creditBtn.text, creditBtn.x + 110, creditBtn.y + 35);
	};

	UI.prototype.createGameUI = function() {
		
	};

	UI.prototype.createCreditUI = function() {
		
	};

	UI.prototype.createEndGameUI = function() {

	};

	return UI;
})();