
// You can write more code here

/* START OF COMPILED CODE */

class PrefabNextRoom extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-125, -75, 250, 150), Phaser.Geom.Rectangle.Contains);

		// confirmButtonImage
		const confirmButtonImage = scene.add.image(0, 0, "Confirm & End Turn Button");
		this.add(confirmButtonImage);

		// glowFx
		const glowFx = confirmButtonImage.preFX.addGlow(16777215, 10, 0, false);

		// confirmButtonText
		const confirmButtonText = scene.add.text(0, 0, "", {});
		confirmButtonText.setOrigin(0.5, 0.5);
		confirmButtonText.text = "Confirm";
		confirmButtonText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "32px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(confirmButtonText);

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(this);

		// pushActionScript
		const pushActionScript = new PushActionScript(onPointerDownScript);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		this.glowFx = glowFx;
		this.confirmButtonImage = confirmButtonImage;
		this.confirmButtonText = confirmButtonText;
		this.pushActionScript = pushActionScript;
		this.onPointerDownScript = onPointerDownScript;
		this.moveInSceneActionScript = moveInSceneActionScript;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.FX.Glow} */
	glowFx;
	/** @type {Phaser.GameObjects.Image} */
	confirmButtonImage;
	/** @type {Phaser.GameObjects.Text} */
	confirmButtonText;
	/** @type {PushActionScript} */
	pushActionScript;
	/** @type {OnPointerDownScript} */
	onPointerDownScript;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript;
	/** @type {OnAwakeScript} */
	onAwakeScript;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
