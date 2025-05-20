
// You can write more code here

/* START OF COMPILED CODE */

class PrefabAttacks extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 1.5;
		this.scaleY = 1.5;

		// counter_Slash
		const counter_Slash = scene.add.image(-25.08209727543968, -0.5433564941523041, "Counter Slash");
		counter_Slash.angle = 30;
		counter_Slash.setOrigin(0, 1);
		counter_Slash.visible = false;
		this.add(counter_Slash);

		// heavy_Slash
		const heavy_Slash = scene.add.image(11.91790272456032, -0.5433564941523041, "Heavy Slash");
		heavy_Slash.angle = 30;
		heavy_Slash.setOrigin(0, 1);
		heavy_Slash.visible = false;
		this.add(heavy_Slash);

		// normal_Slash
		const normal_Slash = scene.add.image(22.91790272456032, 5.456643505847696, "Normal Slash");
		normal_Slash.angle = 30;
		normal_Slash.setOrigin(0, 1);
		this.add(normal_Slash);

		// recovery_Hit
		const recovery_Hit = scene.add.image(121, 29, "Recovery Hit");
		recovery_Hit.visible = false;
		this.add(recovery_Hit);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
