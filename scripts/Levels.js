//Level scripts go here

//CONSTANTS

//GLOBALS

/*
	Function: construction level
*/
window.Level = (function () {
	function Level (size) {
		this.sections = {};
		this.size = size.split("x");
		this.currentSection = "0x0";

		for (var i = parseInt(this.size[0]) - 1; i >= 0; i--) {
			for (var j = parseInt(this.size[1]) - 1; j >= 0; j--) {
				this.sections[i+"x"+j] = new Section(i+"x"+j);
			}
		}

		return this;
	}

	Level.prototype.getSection = function (coordinates) {
		return this.sections[coordinates];
	};

	Level.prototype.edgedWith = function (side) {
		var section = this.getSection(this.currentSection),
		adjacents = this.getSection(this.currentSection).getAdjacentSection(side);

		if (adjacents != this.currentSection) { 
			this.currentSection = adjacents;
			return adjacents;
		} else {
			godzilla.clamp();
			return false;
		}
	};

	Level.prototype.drawCurrentSection = function () {
		this.getSection(this.currentSection).draw();
	};

	Level.prototype.isAllCleared = function() {
		for (var section in this.sections) {
			if (!this.sections[section].isCleared) { return false; };
		};
		return true;
	};

	return Level;
})();
/*
	Function:
*/
window.Section = (function () {
	function Section (coordinates) {
		this.coordinates = coordinates;
		this.isCleared = false;
		this.buildings = [];
		this.powerups = [];

		for (var i = Math.ceil(getRandom(10, 25)) - 1; i >= 0; i--) {
			this.buildings.push(new Building(randomPosition()));
		};
	}

	Section.prototype.draw = function() {
		if (!images["tilesImage"]) {
			ctx.fillStyle = "#F2EFEB";
			ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		} else {
			ctx.fillStyle = ctx.createPattern(images["tilesImage"], "repeat");
			ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		}

		for (var i = this.buildings.length - 1; i >= 0; i--) {
			this.buildings[i].draw();
		};

		for (var j = this.powerups.length - 1; j >= 0; j--) {
			this.powerups[j].draw();
		};
	};

	Section.prototype.getAdjacentSection = function(edgeWith) {
		var coords = this.coordinates.split("x");
		var size = level.size;
		switch(edgeWith) {
			case "top":
				if (coords[0] >= 1) { coords[0]--; };
				break;
			case "bottom":
				if (coords[0] < size[0] - 1) { coords[0]++; };
				break;
			case "left":
				if (coords[1] >= 1) { coords[1]--; };
				break;
			case "right":
				if (coords[1] < size[1] - 1) { coords[1]++; };
				break;
		}

		return coords.join("x");
	};

	Section.prototype.destroyBuilding = function(building) {
		var indexAt = this.buildings.indexOf(building);
		if (indexAt >= -1) {
			this.buildings[indexAt].destroy();
			this.isCleared = this.buildings.every(function(building) {
				return building.isDestroyed;
			});
			if (this.isCleared) { level.isAllCleared(); };
		};
	};

	/*
	Function: randomPosition
	Return: { "x", "y" }

	*/
	function randomPosition () {
		return { "x": getRandom(50, CANVAS_WIDTH - 50), "y": getRandom(50, CANVAS_HEIGHT - 50) };
	}

	return Section;
})();
/*
	Function:
*/
window.Building = (function() {
	function Building (position) {
		this.position = position;
		this.x = position.x;
		this.y = position.y;
		this.width = 50;
		this.height = 50;
		this.spriteX = Math.floor(Math.random() * 8) * 50;
		this.spriteY = Math.floor(Math.random() * 4) * 50;
		this.isDestroyed = false;
		this.powerup;

		if(Math.random() > 0.5) {
			this.powerup = new Powerup(Math.floor(Math.random() * 3), this.position);
		}

		return this;
	}

	Building.prototype.draw = function () {
		if (!this.isDestroyed) {
			if (!images["buildingsImage"]) {
				ctx.fillStyle = "#8D8A83";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			} else {
				ctx.drawImage(images["buildingsImage"], this.spriteX, this.spriteY, 50, 50, this.x, this.y, this.width, this.height);

				ctx.fillStyle = "rgba(102,102,102,0)";
				ctx.shadowColor = "#666";
				ctx.shadowBlur = 10;
				ctx.shadowOffsetY = 3;	
				ctx.fillRect(this.x, this.y + this.height, this.width, 10);
			}
		}
	};

	Building.prototype.destroy = function () {
		if (!this.isDestroyed) {
			this.isDestroyed = true;
			godzilla.score += 5;
			if (this.powerup) {
				level.getSection(level.currentSection).powerups.push(this.powerup);
			};
		}
	};

	return Building;
})();
/*
	Function:
*/
window.Powerup = (function() {
	function Powerup (type, position) {
		this.type = type;
		this.isConsumed = false;
		this.position = position;
		this.x = position.x;
		this.y = position.y;
		this.width = 10;
		this.height = 10;
		this.color = "white";
		this.effect = null;

		switch(this.type) {
			case 0: // health
				this.effect = function() { godzilla.health += 15 };
				this.color = "#53BDFF";
				break;
			case 1:
				this.effect = function() { godzilla.health -= 15 };
				this.color = "#67FF53";
				break;
			case 2:
				this.effect = function() { godzilla.score += 25 };
				this.color = "#FFA349";
				break;
		}

		return this;
	}

	Powerup.prototype.draw = function () {
		if (!this.isConsumed) {
			var gradient;

			gradient = ctx.createRadialGradient(this.x - 2, this.y - 2, 2, this.x, this.y, this.width);
			gradient.addColorStop(0, "white");
			gradient.addColorStop(1, this.color);

			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		};
	};

	Powerup.prototype.consume = function() {
		if (!this.isConsumed) {
			this.isConsumed = true;
			this.effect();
		}
	};

	return Powerup;
})();