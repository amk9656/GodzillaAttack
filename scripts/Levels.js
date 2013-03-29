//Level scripts go here

//CONSTANTS
var SECTION_TYPE_ROCK =		 { lightest: "#F2EFEB", lighter: "#BDB5AA", mid: "#959387", darker: "#8D8A83", darkest: "#68635F" },
	SECTION_TYPE_VOLCANO =	 { lightest: "", lighter: "", mid: "", darker: "", darkest: "" },
	SECTION_TYPE_GRASSLAND = { lightest: "", lighter: "", mid: "", darker: "", darkest: "" };

//GLOBALS

/*
	Function: construction level
*/
function Level(size) {
	var level = {
		"sections": {},
		"size": size,
		"currentSection": "0x0",
		"getSection": function (coordinates) {
			return this.sections[coordinates];
		},
		"edgedWith": function(side) {
			// 1. get current section
			var section = level.getSection(level.currentSection);
			// 2. figure where is it heading to

			// 3. check if section exists
			var adjacents = this.getSection(this.currentSection).getAdjacentSection(side);
			// 5. set parameters
			this.currentSection = adjacents;
		}
	};

	size = size.split("x");
	for (var i = parseInt(size[0]) - 1; i >= 0; i--) {
		for (var j = parseInt(size[1]) - 1; j >= 0; j--) {
			var coord = i+"x"+j;
			level.sections[coord] = new Section(SECTION_TYPE_ROCK, coord);
		};
	};

	return level;
}
/*
	Function:
*/
function Section(type, coordinates) {
	var section = {
		"type": type,
		"coordinates": coordinates,
		"buildings": [],
		"draw": function () {
			ctx.fillStyle = type.lightest;
			ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			ctx.fillStyle = "black";
			ctx.font="20px Georgia";
			ctx.fillText(this.coordinates, 30, 30);

			for (var i = this.buildings.length - 1; i >= 0; i--) {
				this.buildings[i].draw();
			};
		},
		"getAdjacentSection": function (edgeWith) {
			var coords = coordinates.split("x");
			var size = level.size.split("x");
			switch(edgeWith) {
				case "top":
					if (coords[0] > 1) { coords[0]--; };
					break;
				case "bottom":
					if (coords[0] < size[0] - 1) { coords[0]++; };
					break;
				case "left":
					if (coords[1] > 1) { coords[1]--; };
					break;
				case "right":
					if (coords[1] < size[1] - 1) { coords[1]++; };
					break;
			}

			return coords.join("x");
		}
	};

	for (var i = Math.ceil(Math.random() * 15) - 1; i >= 0; i--) {
		section.buildings.push(new Building(SECTION_TYPE_ROCK, randomPosition()));
	};

	return section;
}
/*
	Function:
*/
function Building(type, position, size) {
	var building = {
		"type": type,
		"wrecked": false,
		"position": position,
		"x": position.x,
		"y": position.y,
		"width": 30,
		"height": 30,
		"isDestroyed": false,
		"powerups": [],
		"draw": function ()
		{
			ctx.fillStyle = type.darker;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		},
		"destroy": function () {
			this.isDestroyed = true;
		}
	};

	return building;
}
/*
	Function:
*/
function Powerup(type, position) {
	var powerup = {
		"type": type,
		"used": false,
		"position": position,
		"draw": function ()
		{

		}
	};

	return powerup;
}
/*
	Function: randomPosition
	Return: n/a

*/
function randomPosition ()
{
	return { "x": Math.ceil(Math.random() * CANVAS_WIDTH), "y": Math.ceil(Math.random() * CANVAS_HEIGHT) };
}