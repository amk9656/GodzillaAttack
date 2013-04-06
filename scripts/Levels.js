//Level scripts go here

//CONSTANTS
var SECTION_TYPE_ROCK =		 { lightest: "#F2EFEB", lighter: "#BDB5AA", mid: "#959387", darker: "#8D8A83", darkest: "#68635F" },
	SECTION_TYPE_VOLCANO =	 { lightest: "", lighter: "", mid: "", darker: "", darkest: "" },
	SECTION_TYPE_GRASSLAND = { lightest: "", lighter: "", mid: "", darker: "", darkest: "" };

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
				this.sections[i+"x"+j] = new Section(SECTION_TYPE_ROCK, i+"x"+j);
			}
		}

		return this;
	}

	Level.prototype.getSection = function (coordinates) {
		return this.sections[coordinates];
	};

	Level.prototype.edgedWith = function (side) {
		// 1. get current section
		var section = level.getSection(level.currentSection);
		// 3. check if section exists
		var adjacents = this.getSection(this.currentSection).getAdjacentSection(side);
		if (adjacents != this.currentSection) { edgeGodzilla(side); } else { clampGodzilla(); }
		// 5. set parameters
		this.currentSection = adjacents;

		return adjacents;
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
	function Section (type, coordinates) {
		this.type = type;
		this.coordinates = coordinates;
		this.buildings = [];
		this.powerups = [];

		for (var i = Math.ceil(Math.random() * 15) - 1; i >= 0; i--) {
			this.buildings.push(new Building(SECTION_TYPE_ROCK, randomPosition()));
		};

		return this;
	}

	Section.prototype.draw = function() {
		ctx.fillStyle = this.type.lightest;
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		for (var i = this.buildings.length - 1; i >= 0; i--) {
			this.buildings[i].draw();
		};
	};

	Section.prototype.getAdjacentSection = function(edgeWith) {
		var coords = coordinates.split("x");
		var size = level.size;
		switch(edgeWith) {
			case "top":
				if (coords[0] >= 1) { coords[0]--; };
				break;
			case "bottom":
				if (coords[0] <= size[0] - 1) { coords[0]++; };
				break;
			case "left":
				if (coords[1] >= 1) { coords[1]--; };
				break;
			case "right":
				if (coords[1] <= size[1] - 1) { coords[1]++; };
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
	function Building (type, position) {
		this.type = type;
		this.position = position;
		this.x = position.x;
		this.y = position.y;
		this.width = 30;
		this.height = 30;
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
			ctx.fillStyle = this.type.darker;
			ctx.fillRect(this.x, this.y, this.width, this.height);
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
