
// You can write more code here
	var girlColor
	var boyColor
/* START OF COMPILED CODE */

class Ending extends Phaser.Scene {

	constructor() {
		super("Ending");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// endingBackground
		const endingBackground = this.add.image(960, 540, "EndingBackground");

		// endingText
		const endingText = this.add.text(1200, 400, "", {});
		endingText.setOrigin(0.5, 0.5);
		endingText.text = "IT'S A TIE...";
		endingText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "128px", "stroke": "#000000ff", "strokeThickness":20});
		endingText.setWordWrapWidth(290);

		// girlWins
		const girlWins = this.add.image(960, 540, "GirlWins");
		girlWins.visible = false;

		// girlWinsBoyColors
		const girlWinsBoyColors = this.add.image(1301.7168, 945.6795, "Girl Wins Boy Colors");
		girlWinsBoyColors.visible = false;

		// girlWinsGirlColors
		const girlWinsGirlColors = this.add.image(779.8259, 649.6259, "Girl Wins Girl Colors");
		girlWinsGirlColors.visible = false;

		// boyWins
		const boyWins = this.add.image(960, 540, "BoyWins");
		boyWins.visible = false;

		// boyWinsBoyColors
		const boyWinsBoyColors = this.add.image(1450.6907, 804.1161, "Boy Wins Boy Colors");
		boyWinsBoyColors.visible = false;

		// boyWinsGirlColors
		const boyWinsGirlColors = this.add.image(892.6917, 760.4895, "Boy Wins Girl Colors");
		boyWinsGirlColors.visible = false;

		// draw
		const draw = this.add.image(960, 540, "Draw");
		draw.visible = false;

		// drawBoyColors
		const drawBoyColors = this.add.image(1301.7168, 945.6795, "Draw Boy Colors");
		drawBoyColors.visible = false;

		// drawGirlColors
		const drawGirlColors = this.add.image(892.1152, 758.3424, "Draw Girl Colors");
		drawGirlColors.visible = false;

		// dungeonShowdown
		const dungeonShowdown = this.add.text(1132, 820, "", {});
		dungeonShowdown.setOrigin(0.5, 0.5);
		dungeonShowdown.text = "DUNGEON\nSHOWDOWN";
		dungeonShowdown.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":10});
		dungeonShowdown.setWordWrapWidth(290);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		this.endingBackground = endingBackground;
		this.endingText = endingText;
		this.girlWins = girlWins;
		this.girlWinsBoyColors = girlWinsBoyColors;
		this.girlWinsGirlColors = girlWinsGirlColors;
		this.boyWins = boyWins;
		this.boyWinsBoyColors = boyWinsBoyColors;
		this.boyWinsGirlColors = boyWinsGirlColors;
		this.draw = draw;
		this.drawBoyColors = drawBoyColors;
		this.drawGirlColors = drawGirlColors;
		this.dungeonShowdown = dungeonShowdown;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	endingBackground;
	/** @type {Phaser.GameObjects.Text} */
	endingText;
	/** @type {Phaser.GameObjects.Image} */
	girlWins;
	/** @type {Phaser.GameObjects.Image} */
	girlWinsBoyColors;
	/** @type {Phaser.GameObjects.Image} */
	girlWinsGirlColors;
	/** @type {Phaser.GameObjects.Image} */
	boyWins;
	/** @type {Phaser.GameObjects.Image} */
	boyWinsBoyColors;
	/** @type {Phaser.GameObjects.Image} */
	boyWinsGirlColors;
	/** @type {Phaser.GameObjects.Image} */
	draw;
	/** @type {Phaser.GameObjects.Image} */
	drawBoyColors;
	/** @type {Phaser.GameObjects.Image} */
	drawGirlColors;
	/** @type {Phaser.GameObjects.Text} */
	dungeonShowdown;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();

		this.confirmButton.confirmButtonText.text = "Play Again!"

		if (data.state == 8) {
			this.endingText.text = "Victory!"
			VictoryEnding.play()
			if (data.IsPlayer1) {
				this.girlWins.visible = true
			}
			else{
				this.boyWins.visible = true
			}
		}
		else if (data.state == 9) {
			this.endingText.text = "Defeat..."
			DefeatEnding.play()
			if(data.IsPlayer1) {
				this.boyWins.visible = true
			}
			else{
				this.girlWins.visible = true
			}
		}
		else if (data.state == 10) {
			this.endingText.text = "It's a Tie..."
			this.draw.visible = true
		}

		this.confirmButton.on("pointerdown", () => {
			ButtonSFX.play()
			this.EndMatch()
		})
		
		console.log("PLAYER: " + data)

		if (data.IsPlayer1) {
			girlColor = data.player_color.replace("#", "0x")
			boyColor = data.opponent_color.replace("#", "0x")
		}
		else {
			girlColor = data.player_color.replace("#", "0x")
			boyColor = data.opponent_color.replace("#", "0x")

		}

		if (this.girlWins.visible) {
			this.girlWinsGirlColors.cardBorder.setTint(girlColor)
			this.girlWinsBoyColors.cardBorder.setTint(boyColor)
		}
		else if (this.boyWins.visible) {
			this.boyWinsGirlColors.cardBorder.setTint(girlColor)
			this.boyWinsBoyColors.cardBorder.setTint(boyColor)
		} else {
			this.drawGirlColors.cardBorder.setTint(girlColor)
			this.drawBoyColors.cardBorder.setTint(boyColor)
		}

	}

	EndMatch() {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					this.scene.start("JoinMatch", data);
				}
			}
		}

		xhttp.open("POST", "/endGame", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
