
// You can write more code here

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

		//Is the player Logged in?
		
		//Is the Match known?
		//getMatchState
		
		//Get State

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Showdown"));
	}

	LoginCheck() {

		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var data = JSON.parse(this.responseText)
				console.log(data)

				if (this.status == 200){
					if(data.state = "NOT_LOGGED_IN") {
						window.location.href = "/login.html";
						return
					}
					else {
						MatchCheck()
					}
					
				}
			}
		}

		xhttp.open("GET", "/idLoggedIn", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	MatchCheck() {

		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var data = JSON.parse(this.responseText)
				console.log(data)

				if (this.status == 200){
					if(data.state = "MATCH_FOUND") {
						//Get State
						GetGameState()
					}
					else if (data.state = "NOT_IN_MATCH"){
						//Go to Main Menu 
						this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("JoinMatch"));

					}
					else if (data.state = "WAITING_FOR_MATCH"){
						//Go to waiting for a Match
						this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("WaitingForMatch"));

					}
					
				}
			}
		}

		xhttp.open("GET", "/getMatchState", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	GetGameState(){
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var data = JSON.parse(this.responseText)
				console.log(data)

				if (this.status == 200){
					//All the differenet states
				}
			}
		}

		xhttp.open("GET", "/getGameState", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
