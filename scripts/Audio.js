// all audio related js goes here
"use strict";

// GLOBALS

// CONSTANTS

window.AudioEffect = (function() {
	//
	//	Constructor Function
	//		AudioEffect(sourceFile:string, isLoop:boolean, isTriggered:boolean, killOnPlayed:boolean)
	//		Return a AudioEffect object
	//		sourceFile is strictly limited to sounds directory
	//
	function AudioEffect (sourceFile, isLoop, isTriggered, killOnPlayed) {
		this.channel = new Audio();
		this.sourceFile = "sounds/" + sourceFile;
		this.isLoop = isLoop;
		this.isTriggered = isTriggered;
		this.killOnPlayed = killOnPlayed;

		var sourceFileURL = this.sourceFile;
		if (this.channel.canPlayType("audio/mpeg")) {
			sourceFileURL += ".mp3";
		} else {
			sourceFileURL += ".wav";
		}

		this.channel.src = sourceFileURL;
		this.channel.volume = 1;
		this.channel.loop = this.isLoop;

		if (this.killOnPlayed) {
			this.channel.addEventListener("played", function(evt) {
				console.log(evt);
			});
		};

		if (this.isTriggered) {
			this.channel.play();
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