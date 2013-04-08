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

	return Level;
})();
/*
	Function:
*/
window.Section = (function () {
	function Section (coordinates) {
		this.coordinates = coordinates;
		this.buildings = [];
		this.powerups = [];

		for (var i = Math.ceil(Math.random() * 50) - 1; i >= 0; i--) {
			this.buildings.push(new Building(randomPosition()));
		};

		return this;
	}

	Section.prototype.draw = function() {
		ctx.fillStyle = "#F2EFEB";
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		for (var i = this.buildings.length - 1; i >= 0; i--) {
			this.buildings[i].draw();
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
			this.powerup = new Powerup("health", this.position);
		}

		return this;
	}

	Building.prototype.draw = function () {
		if (this.isDestroyed && this.powerup != null) {
			this.powerup.draw();
		} else if (this.isDestroyed) {
				// draw nothing
		} else {
			if (!images["buildingsImage"]) {
				ctx.fillStyle = "#8D8A83";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			} else {
				ctx.drawImage(images["buildingsImage"], this.spriteX, this.spriteY, 50, 50, this.x, this.y, this.width, this.height);
			}
		}
	};

	Building.prototype.destroy = function () {
		this.isDestroyed = true;
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

		return this;
	}

	Powerup.prototype.draw = function () {
		if (!this.isConsumed) {
			ctx.fillStyle = "#2EBCE9";
			ctx.beginPath();
			ctx.arc(this.x - 30, this.y - 35, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		};
	};

	Powerup.prototype.consume = function() {
		this.isConsumed = true;
	};

	return Powerup;
})();
/*
	Function: randomPosition
	Return: { "x", "y" }

*/
function randomPosition ()
{
	return { "x": Math.ceil(Math.random() * CANVAS_WIDTH), "y": Math.ceil(Math.random() * CANVAS_HEIGHT) };
}