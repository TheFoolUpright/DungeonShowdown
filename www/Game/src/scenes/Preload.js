
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

var VictoryEnding
var DefeatEnding

var PlayerCardSFX
var OpponentCardSFX
var ButtonSFX

var DodgeSFX
var ClumsyBlockSFX
var SolidBlockSFX
var ImpressiveBlockSFX
var ParrySFX

var FemaleAdrenalineSFX
var FemaleAngerSFX
var FemaleFocusSFX
var FemaleHealingSFX
var FemaleRageSFX

var MaleAdrenalineSFX
var MaleAngerSFX
var MaleFocusSFX
var MaleHealingSFX
var MaleRageSFX

var FemaleCounterAttackSFX1
var FemaleCounterAttackSFX2
var FemaleCounterAttackSFX3
var FemaleCounterAttackSFX4

var MaleCounterAttackSFX1
var MaleCounterAttackSFX2
var MaleCounterAttackSFX3
var MaleCounterAttackSFX4

var FemaleHeavyAttackSFX1
var FemaleHeavyAttackSFX2
var FemaleHeavyAttackSFX3
var FemaleHeavyAttackSFX4

var MaleHeavyAttackSFX1
var MaleHeavyAttackSFX2
var MaleHeavyAttackSFX3
var MaleHeavyAttackSFX4

var FemaleNormalAttackSFX1
var FemaleNormalAttackSFX2
var FemaleNormalAttackSFX3
var FemaleNormalAttackSFX4

var MaleNormalAttackSFX1
var MaleNormalAttackSFX2
var MaleNormalAttackSFX3
var MaleNormalAttackSFX4

var FemaleRecoveryAttackSFX1
var FemaleRecoveryAttackSFX2
var FemaleRecoveryAttackSFX3
var FemaleRecoveryAttackSFX4

var MaleRecoveryAttackSFX1
var MaleRecoveryAttackSFX2
var MaleRecoveryAttackSFX3
var MaleRecoveryAttackSFX4

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

		if(!VictoryEnding){
			VictoryEnding = this.sound.add("VictoryEnding")
		}
		if(!DefeatEnding){
			DefeatEnding = this.sound.add("DefeatEnding")
		}

		if(!PlayerCardSFX){
			PlayerCardSFX = this.sound.add("PlayerCardSFX")
		}
		if(!OpponentCardSFX){
			OpponentCardSFX = this.sound.add("OpponentCardSFX")
		}
		if(!ButtonSFX){
			ButtonSFX = this.sound.add("StickerButtonSFX")
		}

		if(!DodgeSFX){
			DodgeSFX = this.sound.add("DodgeSFX")
		}
		if(!ClumsyBlockSFX){
			this.load.audio('CardboardSound1','/assets/sfx/CardboardSound1.mp3')
			ClumsyBlockSFX = this.sound.add("CardboardSound1")
		}
		if(!SolidBlockSFX){
			SolidBlockSFX = this.sound.add("CardboardSound8")
		}
		if(!ImpressiveBlockSFX){
			ImpressiveBlockSFX = this.sound.add("CardboardSound2")
		}
		if(!ParrySFX){
			ParrySFX = this.sound.add("CardboardSound3")
		}

		if(!FemaleAdrenalineSFX){
			FemaleAdrenalineSFX = this.sound.add("FemaleAdrenalineSFX")
		}
		if(!FemaleAngerSFX){
			FemaleAngerSFX = this.sound.add("FemaleAngerSFX")
		}
		if(!FemaleFocusSFX){
			FemaleFocusSFX = this.sound.add("FemaleFocusSFX")
		}
		if(!FemaleHealingSFX){
			FemaleHealingSFX = this.sound.add("FemaleHealingSFX")
		}
		if(!FemaleRageSFX){
			FemaleRageSFX = this.sound.add("FemaleRageSFX")
		}

		if(!MaleAdrenalineSFX){
			MaleAdrenalineSFX = this.sound.add("MaleAdrenalineSFX")
		}
		if(!MaleAngerSFX){
			MaleAngerSFX = this.sound.add("MaleAngerSFX")
		}
		if(!MaleFocusSFX){
			MaleFocusSFX = this.sound.add("MaleFocusSFX")
		}
		if(!MaleHealingSFX){
			MaleHealingSFX = this.sound.add("MaleHealingSFX")
		}
		if(!MaleRageSFX){
			MaleRageSFX = this.sound.add("MaleRageSFX")
		}

		if(!FemaleCounterAttackSFX1){
			FemaleCounterAttackSFX1 = this.sound.add("FemaleCounterAttackSFX1")
		}
		if(!FemaleCounterAttackSFX2){
			FemaleCounterAttackSFX2 = this.sound.add("FemaleCounterAttackSFX2")
		}
		if(!FemaleCounterAttackSFX3){
			FemaleCounterAttackSFX3 = this.sound.add("FemaleCounterAttackSFX3")
		}
		if(!FemaleCounterAttackSFX4){
			FemaleCounterAttackSFX4 = this.sound.add("FemaleCounterAttackSFX4")
		}

		if(!MaleCounterAttackSFX1){
			MaleCounterAttackSFX1 = this.sound.add("MaleCounterAttackSFX1")
		}
		if(!MaleCounterAttackSFX2){
			MaleCounterAttackSFX2 = this.sound.add("MaleCounterAttackSFX2")
		}
		if(!MaleCounterAttackSFX3){
			MaleCounterAttackSFX3 = this.sound.add("MaleCounterAttackSFX3")
		}
		if(!MaleCounterAttackSFX4){
			MaleCounterAttackSFX4 = this.sound.add("MaleCounterAttackSFX4")
		}

		if(!FemaleHeavyAttackSFX1){
			FemaleHeavyAttackSFX1 = this.sound.add("FemaleHeavyAttackSFX1")
		}
		if(!FemaleHeavyAttackSFX2){
			FemaleHeavyAttackSFX2 = this.sound.add("FemaleHeavyAttackSFX2")
		}
		if(!FemaleHeavyAttackSFX3){
			FemaleHeavyAttackSFX3 = this.sound.add("FemaleHeavyAttackSFX3")
		}
		if(!FemaleHeavyAttackSFX4){
			FemaleHeavyAttackSFX4 = this.sound.add("FemaleHeavyAttackSFX4")
		}

		if(!MaleHeavyAttackSFX1){
			MaleHeavyAttackSFX1 = this.sound.add("MaleHeavyAttackSFX1")
		}
		if(!MaleHeavyAttackSFX2){
			MaleHeavyAttackSFX2 = this.sound.add("MaleHeavyAttackSFX2")
		}
		if(!MaleHeavyAttackSFX3){
			MaleHeavyAttackSFX3 = this.sound.add("MaleHeavyAttackSFX3")
		}
		if(!MaleHeavyAttackSFX4){
			MaleHeavyAttackSFX4 = this.sound.add("MaleHeavyAttackSFX4")
		}

		if(!FemaleNormalAttackSFX1){
			FemaleNormalAttackSFX1 = this.sound.add("FemaleNormalAttackSFX1")
		}
		if(!FemaleNormalAttackSFX2){
			FemaleNormalAttackSFX2 = this.sound.add("FemaleNormalAttackSFX2")
		}
		if(!FemaleNormalAttackSFX3){
			FemaleNormalAttackSFX3 = this.sound.add("FemaleNormalAttackSFX3")
		}
		if(!FemaleNormalAttackSFX4){
			FemaleNormalAttackSFX4 = this.sound.add("FemaleNormalAttackSFX4")
		}

		if(!MaleNormalAttackSFX1){
			MaleNormalAttackSFX1 = this.sound.add("MaleNormalAttackSFX1")
		}
		if(!MaleNormalAttackSFX2){
			MaleNormalAttackSFX2 = this.sound.add("MaleNormalAttackSFX2")
		}
		if(!MaleNormalAttackSFX3){
			MaleNormalAttackSFX3 = this.sound.add("MaleNormalAttackSFX3")
		}
		if(!MaleNormalAttackSFX4){
			MaleNormalAttackSFX4 = this.sound.add("MaleNormalAttackSFX4")
		}

		if(!FemaleRecoveryAttackSFX1){
			FemaleRecoveryAttackSFX1 = this.sound.add("FemaleRecoveryAttackSFX1")
		}
		if(!FemaleRecoveryAttackSFX2){
			FemaleRecoveryAttackSFX2 = this.sound.add("FemaleRecoveryAttackSFX2")
		}
		if(!FemaleRecoveryAttackSFX3){
			FemaleRecoveryAttackSFX3 = this.sound.add("FemaleRecoveryAttackSFX3")
		}
		if(!FemaleRecoveryAttackSFX4){
			FemaleRecoveryAttackSFX4 = this.sound.add("FemaleRecoveryAttackSFX4")
		}

		if(!MaleRecoveryAttackSFX1){
			MaleRecoveryAttackSFX1 = this.sound.add("MaleRecoveryAttackSFX1")
		}
		if(!MaleRecoveryAttackSFX2){
			MaleRecoveryAttackSFX2 = this.sound.add("MaleRecoveryAttackSFX2")
		}
		if(!MaleRecoveryAttackSFX3){
			MaleRecoveryAttackSFX3 = this.sound.add("MaleRecoveryAttackSFX3")
		}
		if(!MaleRecoveryAttackSFX4){
			MaleRecoveryAttackSFX4 = this.sound.add("MaleRecoveryAttackSFX4")
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
