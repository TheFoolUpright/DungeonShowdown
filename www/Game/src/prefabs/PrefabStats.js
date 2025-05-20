
// You can write more code here

/* START OF COMPILED CODE */

class PrefabStats extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 2;
		this.scaleY = 2;

		// healthBar
		const healthBar = scene.add.image(0, 0, "MaxHealthBar");
		this.add(healthBar);

		// healthText
		const healthText = scene.add.text(12, -3, "", {});
		healthText.setOrigin(0.5, 0.5);
		healthText.text = "20/20";
		healthText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		this.add(healthText);

		// energyBar
		const energyBar = scene.add.image(0, 80, "EnergyBar");
		this.add(energyBar);

		// energyText
		const energyText = scene.add.text(12, 77, "", {});
		energyText.setOrigin(0.5, 0.5);
		energyText.text = "30";
		energyText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		this.add(energyText);

		// insightBar
		const insightBar = scene.add.image(0, 40, "InsightBar");
		this.add(insightBar);

		// insightText
		const insightText = scene.add.text(12, 37, "", {});
		insightText.setOrigin(0.5, 0.5);
		insightText.text = "10/10";
		insightText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		this.add(insightText);

		// mightBar
		const mightBar = scene.add.image(0, 120, "MightBar");
		this.add(mightBar);

		// mightText
		const mightText = scene.add.text(12, 117, "", {});
		mightText.setOrigin(0.5, 0.5);
		mightText.text = "30";
		mightText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		this.add(mightText);

		this.healthText = healthText;
		this.energyText = energyText;
		this.insightText = insightText;
		this.mightText = mightText;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	healthText;
	/** @type {Phaser.GameObjects.Text} */
	energyText;
	/** @type {Phaser.GameObjects.Text} */
	insightText;
	/** @type {Phaser.GameObjects.Text} */
	mightText;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
