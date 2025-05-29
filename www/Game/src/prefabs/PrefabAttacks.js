
// You can write more code here

/* START OF COMPILED CODE */

class PrefabAttacks extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 1.8;
		this.scaleY = 1.8;

		// counter_Slash
		const counter_Slash = scene.add.image(0, 0, "Counter Slash");
		counter_Slash.setOrigin(0.56, 1.1);
		counter_Slash.visible = false;
		this.add(counter_Slash);

		// heavy_Slash
		const heavy_Slash = scene.add.image(0, 0, "Heavy Slash");
		heavy_Slash.setOrigin(0.51, 1.1);
		heavy_Slash.visible = false;
		this.add(heavy_Slash);

		// normal_Slash
		const normal_Slash = scene.add.image(0, 0, "Normal Slash");
		normal_Slash.setOrigin(0.56, 1.1);
		normal_Slash.visible = false;
		this.add(normal_Slash);

		// recovery_Hit
		const recovery_Hit = scene.add.image(0, 0, "Recovery Hit");
		recovery_Hit.setOrigin(0.63, 1.1);
		recovery_Hit.visible = false;
		this.add(recovery_Hit);

		this.counter_Slash = counter_Slash;
		this.heavy_Slash = heavy_Slash;
		this.normal_Slash = normal_Slash;
		this.recovery_Hit = recovery_Hit;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	counter_Slash;
	/** @type {Phaser.GameObjects.Image} */
	heavy_Slash;
	/** @type {Phaser.GameObjects.Image} */
	normal_Slash;
	/** @type {Phaser.GameObjects.Image} */
	recovery_Hit;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
