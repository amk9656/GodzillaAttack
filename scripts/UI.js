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
		var logo, startGameBtn, creditBtn;

		logo = new UIElement({ type: "text", text: "Godzilla Attack", x: 0, y: 160, draw: function() {
			ctx.font = "60px Geo";
			ctx.fillStyle = "black";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;

			this.x = (CANVAS_WIDTH - ctx.measureText(this.text).width) / 2;

			ctx.fillText(this.text, this.x, this.y);
		} });

		startGameBtn = new UIElement({ type: "button", text: "start", x: 170, y: 300, width: 300, height:50, callback: function() {
			ui.switchUI("game");
			if (level == null) { initGame(); };
		}, draw: function() {
			var gradient;

			gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
			gradient.addColorStop(0, "#2fc900");
			gradient.addColorStop(1, "#299a0b");

			ctx.font = "30px Geo";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "2px";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;

			ctx.fillStyle = gradient;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeRect(this.x, this.y, this.width, this.height);

			ctx.fillStyle = "black";
			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;
			ctx.shadowOffsetY = 0;
			ctx.fillText(this.text, this.x + 120, this.y + 35);
		}, animate: function(dt) {

		} });

		creditBtn = new UIElement({ type: "button", text: "credit", x: 170, y: 380, width: 300, height: 50, callback: function() { ui.switchUI("credit"); 
		}, draw: function() {
			var gradient;

			gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
			gradient.addColorStop(0, "#2fc900");
			gradient.addColorStop(1, "#299a0b");

			ctx.font = "30px Geo";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "2px";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;	

			ctx.fillStyle = gradient;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeRect(this.x, this.y, this.width, this.height);

			ctx.fillStyle = "black";
			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;
			ctx.shadowOffsetY = 0;
			ctx.fillText(this.text, this.x + 110, this.y + 35);
		}, animate: function(dt) {

		} });

		ui.drawableElements.push(startGameBtn, creditBtn, logo);
		ui.clickableElements.push(startGameBtn, creditBtn);
		ui.animatableElements.push(startGameBtn, creditBtn);
	};

	function createGameUI() {
		var healthBar, scoreBar;

		healthBar = new UIElement({ type: "shape", x: 0, y: 0, width: CANVAS_WIDTH, height: 15, draw: function() {
			var healthGradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
			healthGradient.addColorStop(0, "rgba(255,48,25,0.6)");
			healthGradient.addColorStop(1, "rgba(207,4,4,0.6)");

			ctx.fillStyle = healthGradient;
			ctx.strokeStyle = "rgba(0,0,0,0.6)";
			ctx.lineWidth = "2px";

			ctx.fillRect(healthBar.x, healthBar.y, healthBar.width * (godzilla.health / 100), healthBar.height);
			ctx.strokeRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
		}, animate: function(dt) {

		} });

		scoreBar = new UIElement({ type: "shape", x: 10, y: 30, height: 18, draw: function() {
			
			ctx.font = "18px Geo";

			var textWidth = ctx.measureText("score/ " + godzilla.score);

			ctx.fillStyle = "rgba(255,255,255,0.6)";
			ctx.fillRect(this.x, this.y, textWidth.width, this.height);

			ctx.fillStyle = "black";
			ctx.save();
			ctx.textBaseline = "top";
			ctx.fillText("score/ " + godzilla.score, this.x, this.y);
			ctx.restore();
		} });

		ui.drawableElements.push(healthBar, scoreBar);
	};

	function createCreditUI() {
		var creditBar, backBtn;

		creditBar = new UIElement({ type: "shape", x: 170, y: 30, width: 300, height: 50, text: "credit", draw: function() {
			var gradient;

			gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
			gradient.addColorStop(0, "#2fc900");
			gradient.addColorStop(1, "#299a0b");

			ctx.font = "30px Geo";
			ctx.strokeStyle = "black";
			ctx.lineWidth = "2px";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;	
			ctx.fillStyle = gradient;

			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeRect(this.x, this.y, this.width, this.height);

			ctx.fillStyle = "black";
			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;
			ctx.shadowOffsetY = 0;
			ctx.fillText(this.text, this.x + 110, this.y + 35);
		}, animate: function(dt) {

		} });

		backBtn = new UIElement({ type: "button", x: 50, y: 30, width: 40, height: 50, draw: function() {
			ctx.fillStyle = "#333";
			ctx.strokeStyle = "black";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;

			ctx.moveTo(this.x, this.y + (this.height / 2));
			ctx.lineTo(this.x + this.width, this.y + this.height);
			ctx.lineTo(this.x + this.width, this.y);
			ctx.lineTo(this.x, this.y + (this.height / 2));
			ctx.stroke();
			ctx.fill();
		}, callback: function() {
			ui.switchUI("startGame");
		}, animate: function(dt) {
			
		} });

		ui.drawableElements.push(creditBar, backBtn);
		ui.clickableElements.push(backBtn);
	};

	function createEndGameUI() {
		var restartBtn, youDied;

		youDied = new UIElement({ type: "text", text: "You Died! D:", x: 0, y: 160, draw: function() {
			ctx.font = "30px Geo";
			ctx.fillStyle = "black";
			ctx.shadowColor = "#666";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetY = 1;

			this.x = (CANVAS_WIDTH - ctx.measureText(this.text).width) / 2;

			ctx.fillText(this.text, this.x, this.y);
		} });

		restartBtn = new UIElement({ type: "button", text: "restart", x: 170, y: 380, width: 300, height:50, 
			callback: function() { 
				if (level == null) { 
					ui.switchUI("game");
					initGame(); 
				};
			}, draw: function() {
				var gradient;

				gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
				gradient.addColorStop(0, "#2fc900");
				gradient.addColorStop(1, "#299a0b");
	
				ctx.font = "30px Geo";
				ctx.strokeStyle = "black";
				ctx.lineWidth = "2px";
				ctx.shadowColor = "#666";
				ctx.shadowBlur = 10;
				ctx.shadowOffsetY = 1;	
	
				ctx.fillStyle = gradient;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				ctx.strokeRect(this.x, this.y, this.width, this.height);
	
				ctx.fillStyle = "black";
				ctx.shadowColor = "transparent";
				ctx.shadowBlur = 0;
				ctx.shadowOffsetY = 0;
				var textWidth = ctx.measureText(this.text).width;
				ctx.fillText(this.text, this.x + (this.width - textWidth) / 2, this.y + 35);
			}, animate: function(dt) {
	
			}
		});

		ui.drawableElements.push(restartBtn, youDied);
		ui.clickableElements.push(restartBtn);
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