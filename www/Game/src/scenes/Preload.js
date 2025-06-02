
// You can write more code here
var states = {
    "DungeonCardSelection": 1,
    "DungeonWaitingOnOpponent": 2,
    "DungeonResult": 3, 
    "ShowdownCardSelection": 4,
    "ShowdownWaitingOnOpponent": 5,
    "ShowdownResult": 6,
    "EndingCheck": 7, 
    "Won": 8,
    "Lost": 9,
    "Draw": 10
}

var backgroundMusicVolume = .4
var SFXVolume = 1

var MenuBackgroundMusic
var DungeonBackgroundMusic
var ShowdownBackgroundMusic

var PlayerCardSFX
var OpponentCardSFX
var DodgeSFX
var ButtonSFX

var VictoryEnding
var DefeatEnding

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// guapen
		const guapen = this.add.image(505.0120544433594, 360, "guapen");
		guapen.scaleX = 0.32715486817515643;
		guapen.scaleY = 0.32715486817515643;

		// progressBar
		const progressBar = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(552.0120849609375, 329, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

        this.load.on(Phaser.Loader.Events.COMPLETE, () => {
			this.InitializeAudio()
            this.LoginCheck()
        })

	}

	InitializeAudio(){
		if (!MenuBackgroundMusic){
			MenuBackgroundMusic = this.sound.add("MenuBackgroundMusic",
			{
			mute: false,
			volume: backgroundMusicVolume,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,

			// source of the spatial sound
			source: {
				x: 0,
				y: 0,
				z: 0,
				panningModel: 'equalpower',
				distanceModel: 'inverse',
				orientationX: 0,
				orientationY: 0,
				orientationZ: -1,
				refDistance: 1,
				maxDistance: 10000,
				rolloffFactor: 1,
				coneInnerAngle: 360,
				coneOuterAngle: 0,
				coneOuterGain: 0,
				follow: undefined
				}
			})
		}
	
		if (!DungeonBackgroundMusic){
			DungeonBackgroundMusic = this.sound.add("DungeonBackgroundMusic",
			{
			mute: false,
			volume: backgroundMusicVolume,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,

			// source of the spatial sound
			source: {
				x: 0,
				y: 0,
				z: 0,
				panningModel: 'equalpower',
				distanceModel: 'inverse',
				orientationX: 0,
				orientationY: 0,
				orientationZ: -1,
				refDistance: 1,
				maxDistance: 10000,
				rolloffFactor: 1,
				coneInnerAngle: 360,
				coneOuterAngle: 0,
				coneOuterGain: 0,
				follow: undefined
				}
			})
		}

		if (!ShowdownBackgroundMusic){
			ShowdownBackgroundMusic = this.sound.add("ShowdownBackgroundMusic",
			{
			mute: false,
			volume: backgroundMusicVolume,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,

			// source of the spatial sound
			source: {
				x: 0,
				y: 0,
				z: 0,
				panningModel: 'equalpower',
				distanceModel: 'inverse',
				orientationX: 0,
				orientationY: 0,
				orientationZ: -1,
				refDistance: 1,
				maxDistance: 10000,
				rolloffFactor: 1,
				coneInnerAngle: 360,
				coneOuterAngle: 0,
				coneOuterGain: 0,
				follow: undefined
				}
			})
		}

		if(!PlayerCardSFX){
			PlayerCardSFX = this.sound.add("PlayerCardSFX")
		}
		if(!OpponentCardSFX){
			OpponentCardSFX = this.sound.add("OpponentCardSFX")
		}
		if(!DodgeSFX){
			DodgeSFX = this.sound.add("DodgeSFX")
		}
		if(!ButtonSFX){
			ButtonSFX = this.sound.add("StickerButtonSFX")
		}

		if(!VictoryEnding){
			VictoryEnding = this.sound.add("VictoryEnding")
		}
		if(!DefeatEnding){
			DefeatEnding = this.sound.add("DefeatEnding")
		}


	}

	LoginCheck() {
		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			console.log(xhttp.readyState)
			if (xhttp.readyState == 4) {
				
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					if(data.state == "NOT_LOGGED_IN") {
						window.location.href = "/login.html"
						return
					}
					else if(data.state == "LOGGED_IN") {
						this.MatchCheck()
					}
				}
			}
		}

		xhttp.open("GET", "/idLoggedIn", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}

	MatchCheck() {

		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
					if(data.state == "MATCH_FOUND") {
						//Get State
						this.GetGameState()
					}
					else if (data.state == "NOT_IN_MATCH") {
						//Go to Main Menu 
						 this.scene.start("JoinMatch", data)

					}
					else if (data.state == "WAITING_FOR_MATCH") {
						//Go to waiting for a Match
						 this.scene.start("WaitingForMatch")

					}
				}
			}
		}

		xhttp.open("GET", "/getMatchState", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}

	GetGameState() {
		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)


				if (xhttp.status == 200){
					if(data.state_id == states.DungeonCardSelection) {
						this.GetDungeonData()
					}
					else if(data.state_id == states.DungeonWaitingOnOpponent) {
						 this.scene.start("DungeonWaitingOnOpponent")
					}
					else if(data.state_id == states.DungeonResult) {
						 this.GetDungeonResultData()
					}
					else if(data.state_id == states.ShowdownCardSelection) {
						 this.GetShowdownData()
					}
					else if(data.state_id == states.ShowdownWaitingOnOpponent) {
						 this.scene.start("ShowdownWaitingOnOpponent")
					}
					else if(data.state_id == states.ShowdownResult) {
						 this.scene.start("ShowdownResult")
					}
					else if(data.state_id == states.EndingCheck) {
						 //this.GetShowdownData()
					}
				}
			}
		}

		xhttp.open("GET", "/getGameState", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}

	GetDungeonData() {
		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
				    this.scene.start("Dungeon", data)
				}
			}
		}

		xhttp.open("GET", "/getDungeonCardSelection", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}

    GetDungeonResultData() {
        var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
				    this.scene.start("DungeonResult", data)
				}
			}
		}

		xhttp.open("GET", "/getOpponentCard", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
    }

	GetShowdownData() {
		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
				    this.scene.start("Showdown", data)
				}
			}
		}

		xhttp.open("GET", "/getShowdownCardSelection", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}
	
	GetShowdownResultData(){
		var xhttp = new XMLHttpRequest()
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
				    this.scene.start("ShowdownResult", data)
				}
			}
		}

		xhttp.open("GET", "/getWaitingOnOpponentShowdown", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
