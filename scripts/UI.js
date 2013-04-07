"use strict";
window.UI = (function() {
	function UI() {
		this.UIState = "";
		this.drawableElements = [];
		this.clickableElements = [];
		this.animatableElements = [];

		var canvas = document.querySelector("canvas");
		canvas.addEventListener("mousemove", function(evt) {
			var mouse = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };
			document.body.style.cursor = "default";
			// mousemove events
			ui.clickableElements.forEach(function(element) {
				if (collides(mouse, element)) {
					//	cursor
					document.body.style.cursor = "pointer";
				}
			});
		});
		canvas.addEventListener("mouseup", function(evt) {
			var mouse = { x: evt.offsetX, y: evt.offsetY, width: 1, height: 1 };

			// mouseup events
			ui.clickableElements.forEach(function(element) {
				if (collides(mouse, element)) {
					element.callback();
				};
			});
		});
	}

	UI.prototype.drawUI = function() {
		if (this.drawableElements.length != 0) {
			this.drawableElements.forEach(function(element) {
				element.draw();
			});
		};
	};

	UI.prototype.switchUI = function(switchTo) {
		if (this.UIState != switchTo) {
			this.UIState = switchTo;
			this.drawableElements = [];
			this.clickableElements = [];
			this.animatableElements = [];

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
		}
	};

	UI.prototype.updateUI = function(dt) {
		if (this.animatableElements.length != 0) {
			this.animatableElements.forEach(function(element) {
				element.animate();
			});
		};
	};

	function createStartGameUI() {
		var gradient, startGameBtn, creditBtn;

		gradient = ctx.createLinearGradient(0, 0, 0, 50);
		gradient.addColorStop(0, "rgb(201,22,150)");
		gradient.addColorStop("0.44", "rgb(138,182,107)");
		gradient.addColorStop(1, "rgb(57,130,53)");

		startGameBtn = new UIElement({ type: "button", text: "start", x: 170, y: 300, width: 300, height:50, callback: function() {
					ui.switchUI("game");
					if (level == null) { initGame(); };
				}, draw: function() {
					var grad = gradient;
		
					ctx.font = "30px Georgia";
					ctx.strokeStyle = "black";
					ctx.lineWidth = "2px";
					ctx.shadowColor = "#666";
					ctx.shadowBlur = 10;
					ctx.shadowOffsetY = 1;
		
					ctx.fillStyle = grad;
					ctx.fillRect(this.x, this.y, this.width, this.height);
					ctx.strokeRect(this.x, this.y, this.width, this.height);
		
					ctx.fillStyle = "black";
					ctx.shadowColor = "transparent";
					ctx.shadowBlur = 0;
					ctx.shadowOffsetY = 0;
					ctx.fillText(this.text, this.x + 120, this.y + 35);
				}, animate: function(dt) {
		
				} });

		creditBtn = new UIElement({ type: "button", text: "credit", x: 170, y: 380, width: 300, height:50, callback: function() { ui.switchUI("credit"); 
				}, draw: function() {
					var grad = gradient;
		
					ctx.font = "30px Georgia";
					ctx.strokeStyle = "black";
					ctx.lineWidth = "2px";
					ctx.shadowColor = "#666";
					ctx.shadowBlur = 10;
					ctx.shadowOffsetY = 1;	
		
					ctx.fillStyle = grad;
					ctx.fillRect(this.x, this.y, this.width, this.height);
					ctx.strokeRect(this.x, this.y, this.width, this.height);
		
					ctx.fillStyle = "black";
					ctx.shadowColor = "transparent";
					ctx.shadowBlur = 0;
					ctx.shadowOffsetY = 0;
					ctx.fillText(this.text, this.x + 110, this.y + 35);
				}, animate: function(dt) {
		
				} });

		ui.drawableElements.push(startGameBtn, creditBtn);
		ui.clickableElements.push(startGameBtn, creditBtn);
		ui.animatableElements.push(startGameBtn, creditBtn);
	};

	function createGameUI() {
		var healthGradient, healthBar;

		healthBar = new UIElement({ type: "shape", x: 0, y: 0, width: CANVAS_WIDTH, height: 15, draw: function() {
				ctx.fillStyle = healthGradient;
				ctx.strokeStyle = "black";
				ctx.lineWidth = "2px";

				ctx.fillRect(healthBar.x, healthBar.y, healthBar.width * (godzilla.health / 100), healthBar.height);
				ctx.strokeRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
			}, animate: function(dt) {

			} });

		ui.drawableElements.push(healthBar);
	};

	function createCreditUI() {
		
	};

	function createEndGameUI() {
		var restartBtn;

		restartBtn = new UIElement({ type: "button", text: "restart", x: 170, y: 380, width: 300, height:50, 
			callback: function() { 
				ui.switchUI("game"); 
			}, draw: function() {
				var grad = gradient;
	
				ctx.font = "30px Georgia";
				ctx.strokeStyle = "black";
				ctx.lineWidth = "2px";
				ctx.shadowColor = "#666";
				ctx.shadowBlur = 10;
				ctx.shadowOffsetY = 1;	
	
				ctx.fillStyle = grad;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				ctx.strokeRect(this.x, this.y, this.width, this.height);
	
				ctx.fillStyle = "black";
				ctx.shadowColor = "transparent";
				ctx.shadowBlur = 0;
				ctx.shadowOffsetY = 0;
				ctx.fillText(this.text, this.x + 110, this.y + 35);
			}, animate: function(dt) {
	
			}
		});
	};

	return UI;
})();

window.UIElement = (function() {
	function UIElement (parameters) {
		for (var key in parameters) {
			this[key] = parameters[key];
		};
	}
	return UIElement;
})();