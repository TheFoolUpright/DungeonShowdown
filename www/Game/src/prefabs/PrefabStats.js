
// You can write more code here

/* START OF COMPILED CODE */

class PrefabStats extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 2;
		this.scaleY = 2;

		// healthDifferenceText
		const healthDifferenceText = scene.add.text(50, -4, "", {});
		healthDifferenceText.setOrigin(0, 0.5);
		healthDifferenceText.visible = false;
		healthDifferenceText.text = "- 4";
		healthDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(healthDifferenceText);

		// insightBar
		const insightBar = scene.add.image(0, 70, "InsightBar");
		this.add(insightBar);

		// insightText
		const insightText = scene.add.text(31, 56, "", {});
		insightText.setOrigin(0.5, 0.5);
		insightText.text = "10/10";
		insightText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "25px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(insightText);

		// insightDifferenceText
		const insightDifferenceText = scene.add.text(50, 46, "", {});
		insightDifferenceText.setOrigin(0, 0.5);
		insightDifferenceText.visible = false;
		insightDifferenceText.text = "- 4";
		insightDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(insightDifferenceText);

		// energyBar
		const energyBar = scene.add.image(0, 150, "EnergyBar");
		this.add(energyBar);

		// energyText
		const energyText = scene.add.text(30, 141, "", {});
		energyText.setOrigin(0.5, 0.5);
		energyText.text = "10";
		energyText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "25px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(energyText);

		// energyDifferenceText
		const energyDifferenceText = scene.add.text(50, 97, "", {});
		energyDifferenceText.setOrigin(0, 0.5);
		energyDifferenceText.visible = false;
		energyDifferenceText.text = "- 4";
		energyDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(energyDifferenceText);

		// mightBar
		const mightBar = scene.add.image(0, 220, "MightBar");
		this.add(mightBar);

		// mightText
		const mightText = scene.add.text(25, 208, "", {});
		mightText.setOrigin(0.5, 0.5);
		mightText.text = "1";
		mightText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "25px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(mightText);

		// mightDifferenceText
		const mightDifferenceText = scene.add.text(50, 147, "", {});
		mightDifferenceText.setOrigin(0, 0.5);
		mightDifferenceText.visible = false;
		mightDifferenceText.text = "- 4";
		mightDifferenceText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(mightDifferenceText);

		// healthBar
		const healthBar = scene.add.image(0, 0, "HealthBar");
		this.add(healthBar);

		// healthText
		const healthText = scene.add.text(30, -13, "", {});
		healthText.setOrigin(0.5, 0.5);
		healthText.text = "30/30";
		healthText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "fontSize": "25px", "stroke": "#000000ff", "strokeThickness":8});
		this.add(healthText);

		this.healthDifferenceText = healthDifferenceText;
		this.insightBar = insightBar;
		this.insightText = insightText;
		this.insightDifferenceText = insightDifferenceText;
		this.energyBar = energyBar;
		this.energyText = energyText;
		this.energyDifferenceText = energyDifferenceText;
		this.mightBar = mightBar;
		this.mightText = mightText;
		this.mightDifferenceText = mightDifferenceText;
		this.healthText = healthText;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	healthDifferenceText;
	/** @type {Phaser.GameObjects.Image} */
	insightBar;
	/** @type {Phaser.GameObjects.Text} */
	insightText;
	/** @type {Phaser.GameObjects.Text} */
	insightDifferenceText;
	/** @type {Phaser.GameObjects.Image} */
	energyBar;
	/** @type {Phaser.GameObjects.Text} */
	energyText;
	/** @type {Phaser.GameObjects.Text} */
	energyDifferenceText;
	/** @type {Phaser.GameObjects.Image} */
	mightBar;
	/** @type {Phaser.GameObjects.Text} */
	mightText;
	/** @type {Phaser.GameObjects.Text} */
	mightDifferenceText;
	/** @type {Phaser.GameObjects.Text} */
	healthText;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
