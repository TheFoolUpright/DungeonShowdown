
// You can write more code here

/* START OF COMPILED CODE */

class ColorPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 129, y ?? 97);

		// colorFill
		const colorFill = scene.add.image(0, 0, "ColorFill");
		this.add(colorFill);

		// colorOutline
		const colorOutline = scene.add.image(0, 0, "ColorOutline");
		this.add(colorOutline);

		// glowFx
		colorOutline.preFX.addGlow(16777215, 10, 0, false);

		this.colorFill = colorFill;
		this.colorOutline = colorOutline;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	colorFill;
	/** @type {Phaser.GameObjects.Image} */
	colorOutline;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
