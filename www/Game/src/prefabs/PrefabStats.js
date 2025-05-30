
// You can write more code here

/* START OF COMPILED CODE */

class PrefabStats extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// mightBar
		const mightBar = scene.add.image(0, 210, "MightBar");
		this.add(mightBar);

		// mightText
		const mightText = scene.add.text(30, 197, "", {});
		mightText.setOrigin(0.5, 0.5);
		mightText.text = "1";
		mightText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(mightText);

		// mightDifferenceText
		const mightDifferenceText = scene.add.text(100, 197, "", {});
		mightDifferenceText.setOrigin(0, 0.5);
		mightDifferenceText.visible = false;
		mightDifferenceText.text = "- 4";
		mightDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(mightDifferenceText);

		// energyBar
		const energyBar = scene.add.image(0, 140, "EnergyBar");
		this.add(energyBar);

		// energyText
		const energyText = scene.add.text(30, 127, "", {});
		energyText.setOrigin(0.5, 0.5);
		energyText.text = "10";
		energyText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(energyText);

		// energyDifferenceText
		const energyDifferenceText = scene.add.text(100, 127, "", {});
		energyDifferenceText.setOrigin(0, 0.5);
		energyDifferenceText.visible = false;
		energyDifferenceText.text = "- 4";
		energyDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(energyDifferenceText);

		// insightBar
		const insightBar = scene.add.image(0, 70, "InsightBar");
		this.add(insightBar);

		// insightText
		const insightText = scene.add.text(30, 57, "", {});
		insightText.setOrigin(0.5, 0.5);
		insightText.text = "10/10";
		insightText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(insightText);

		// insightDifferenceText
		const insightDifferenceText = scene.add.text(100, 57, "", {});
		insightDifferenceText.setOrigin(0, 0.5);
		insightDifferenceText.visible = false;
		insightDifferenceText.text = "- 4";
		insightDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(insightDifferenceText);

		// healthBar
		const healthBar = scene.add.image(0, 0, "HealthBar");
		this.add(healthBar);

		// healthText
		const healthText = scene.add.text(30, -13, "", {});
		healthText.setOrigin(0.5, 0.5);
		healthText.text = "30/30";
		healthText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(healthText);

		// healthDifferenceText
		const healthDifferenceText = scene.add.text(100, -13, "", {});
		healthDifferenceText.setOrigin(0, 0.5);
		healthDifferenceText.visible = false;
		healthDifferenceText.text = "- 4";
		healthDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(healthDifferenceText);

		this.mightBar = mightBar;
		this.mightText = mightText;
		this.mightDifferenceText = mightDifferenceText;
		this.energyBar = energyBar;
		this.energyText = energyText;
		this.energyDifferenceText = energyDifferenceText;
		this.insightBar = insightBar;
		this.insightText = insightText;
		this.insightDifferenceText = insightDifferenceText;
		this.healthText = healthText;
		this.healthDifferenceText = healthDifferenceText;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	mightBar;
	/** @type {Phaser.GameObjects.Text} */
	mightText;
	/** @type {Phaser.GameObjects.Text} */
	mightDifferenceText;
	/** @type {Phaser.GameObjects.Image} */
	energyBar;
	/** @type {Phaser.GameObjects.Text} */
	energyText;
	/** @type {Phaser.GameObjects.Text} */
	energyDifferenceText;
	/** @type {Phaser.GameObjects.Image} */
	insightBar;
	/** @type {Phaser.GameObjects.Text} */
	insightText;
	/** @type {Phaser.GameObjects.Text} */
	insightDifferenceText;
	/** @type {Phaser.GameObjects.Text} */
	healthText;
	/** @type {Phaser.GameObjects.Text} */
	healthDifferenceText;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
