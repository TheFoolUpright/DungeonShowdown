
// You can write more code here

/* START OF COMPILED CODE */

class PrefabStats extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 2;
		this.scaleY = 2;

		// healthBar
		const healthBar = scene.add.image(0, 0, "MaxHealthBar");
		healthBar.scaleX = 1.2;
		healthBar.scaleY = 1.2;
		this.add(healthBar);

		// healthText
		const healthText = scene.add.text(12, -4, "", {});
		healthText.setOrigin(0.5, 0.5);
		healthText.text = "20/20";
		healthText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(healthText);

		// energyBar
		const energyBar = scene.add.image(0, 100, "EnergyBar");
		energyBar.scaleX = 1.2;
		energyBar.scaleY = 1.2;
		this.add(energyBar);

		// energyText
		const energyText = scene.add.text(12, 97, "", {});
		energyText.setOrigin(0.5, 0.5);
		energyText.text = "30";
		energyText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(energyText);

		// insightBar
		const insightBar = scene.add.image(0, 50, "InsightBar");
		insightBar.scaleX = 1.2;
		insightBar.scaleY = 1.2;
		this.add(insightBar);

		// insightText
		const insightText = scene.add.text(12, 47, "", {});
		insightText.setOrigin(0.5, 0.5);
		insightText.text = "10/10";
		insightText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(insightText);

		// mightBar
		const mightBar = scene.add.image(0, 150, "MightBar");
		mightBar.scaleX = 1.2;
		mightBar.scaleY = 1.2;
		this.add(mightBar);

		// mightText
		const mightText = scene.add.text(12, 147, "", {});
		mightText.setOrigin(0.5, 0.5);
		mightText.text = "30";
		mightText.setStyle({ "color": "#ffffffff", "fontFamily": "ROCKEY", "stroke": "#000000ff", "strokeThickness":8});
		this.add(mightText);

		this.healthBar = healthBar;
		this.healthText = healthText;
		this.energyBar = energyBar;
		this.energyText = energyText;
		this.insightBar = insightBar;
		this.insightText = insightText;
		this.mightBar = mightBar;
		this.mightText = mightText;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	healthBar;
	/** @type {Phaser.GameObjects.Text} */
	healthText;
	/** @type {Phaser.GameObjects.Image} */
	energyBar;
	/** @type {Phaser.GameObjects.Text} */
	energyText;
	/** @type {Phaser.GameObjects.Image} */
	insightBar;
	/** @type {Phaser.GameObjects.Text} */
	insightText;
	/** @type {Phaser.GameObjects.Image} */
	mightBar;
	/** @type {Phaser.GameObjects.Text} */
	mightText;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
