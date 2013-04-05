// all audio related js goes here
"use strict";

// GLOBALS

// CONSTANTS

window.AudioEffect = (function() {
	function AudioEffect (sourceFile) {
		this.channel = new Audio();
		this.sourceFile = "/sounds/" + sourceFile;
		this.isLoop = arguments[1] || false;
		this.isTriggered = arguments[2] || true;
		this.killOnPlayed = arguments[3] || true;

		var sourceFileURL = this.sourceFile;
		if (this.channel.canPlayType("audio/mpeg")) {
			sourceFileURL += ".MP3";
		} else if (this.channel.canPlayType("audio/ogg")) {
			sourceFileURL += ".OGG";
		} else {
			sourceFileURL += ".WAV";
		}

		this.channel.src = sourceFileURL;
		this.channel.volume = 1;
		this.channel.loop = this.isLoop;

		if (this.killOnPlayed) {
			this.channel.addEventListener("played", function(evt) {
				console.log(evt);
			});
		};
	}

	AudioEffect.prototype.play = function() {
		this.channel.play();
	};

	AudioEffect.prototype.kill = function() {
		this.channel.pause();
		this.channel = null;
	};

	return AudioEffect;
})();